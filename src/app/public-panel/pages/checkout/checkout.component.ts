import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/app/environments/environments';
import { CartItem } from '../../interfaces/cart-item.interface';
import { CartService } from '../../services/cart.service';
import { tap } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Order } from 'src/app/admin-panel/interfaces/order.interface';
import { CustomSnackbarService } from '../../../shared/components/custom-snackbar/custom-snackbar.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  private cartService = inject(CartService);
  private orderService = inject(OrdersService);
  private _cusSnackbar = inject(CustomSnackbarService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public readonly baseUrl : string = environment.baseUrl;
  public total: number = 0;
  public shoppingList: CartItem[] = [];
  public step = 1;
  public paymentMethod: string = '';
  public orderId: string = '';

  public myForm: FormGroup = this.fb.group({
    name:     [''],
    lastName: [''],
    phone:    ['', [Validators.required]],
    address:  ['', [Validators.required]],
    floor :   [''],
    flat:     [''],
    postCode: ['', [Validators.required]],
    city:     ['', [Validators.required]],
    state:    ['', [Validators.required]],
    country:  ['', [Validators.required]],
  });

  accountDetails = [
    { label: 'Titular', value: 'Catalá Matias Nicolas' },
    { label: 'Banco', value: 'Banco Francés BBVA' },
    { label: 'Tipo de Cuenta', value: 'Cuenta Corriente en Pesos' },
    { label: 'Número de Cuenta', value: '201-53903/3' },
    { label: 'CUIL/CUIT', value: '20-42868415-0' },
    { label: 'CBU', value: '0170201140000005390331' },
    { label: 'CBU Alias', value: 'CATALA.MATIAS' }
  ];

  ngOnInit() {
    this.loadCartItems();
  }

  private loadCartItems() {
    this.cartService.products
      .pipe(
        tap(cartProducts => {
          this.total = cartProducts.reduce((prev, curr) => prev + curr.product.price * curr.quantity, 0);
        })
      )
      .subscribe({
        next: cartProducts => {
          this.shoppingList = cartProducts;
        },
        error: err => {
          console.log(err)
        }
      });
  }

  changeQuantity(cartItem: CartItem, quantity: number) {
    const newQuantity = cartItem.quantity + quantity;

    if (newQuantity > 0 ) {
      this.cartService.addProduct({
        product: cartItem.product,
        quantity
      })
    }
  }

  removeShoppItem(product: Product) {
    this.cartService.removeProduct(product)
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  lastStep() {
    this.scrollToTop();
    this.step --;
  }


  nextStep() {
    if (this.step === 2 && this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    if (this.step === 3 ){
      if(!this.paymentMethod) return;

      if (this.paymentMethod === 'efectivo'){
        this.createOrder();
        return;
      }

      if (this.paymentMethod === 'mercadoPago'){
        this._cusSnackbar.openCustomSnackbar("error", 'En proceso...', "Okay", 3000, 'warning');
        return;
      }
    }

    if (this.step === 4){
      this.createOrder();
      return;
    }

    this.scrollToTop();
    this.step++;
 }



 createOrder() {
  this.orderService.createOrder(this.orderData()).subscribe({
    next: (order:Order) => {
      this.scrollToTop();
      this.orderId = order.id.toString();
      this.cartService.clearCart();
      this.step = 5;
    }, error: (e) => {
      this._cusSnackbar.openCustomSnackbar("error", e.error.message, "Okay", 3000, 'danger');
    }
  })
 }

 orderData(){
  const {name, lastName, phone, address, city, postCode, state, country} = this.myForm.value;

  const shippingAddress = {
    name: name + ' ' + lastName,
    phone,
    address,
    city,
    postCode,
    state,
    country
  }

  const orderedProducts = this.shoppingList.map(item => ({
    id: item.product.id,
    product_quantity: item.quantity
  }));


  let payments;

  if (this.paymentMethod === 'efectivo'){
    payments = [
      {
        paymentType: "efectivo",
        amount: this.total,
        currency: "ARS",
      }
    ];
  } else if (this.paymentMethod === 'transferencia') {
    payments = [
      {
        paymentType: "transferencia",
        amount: this.total,
        currency: "ARS",
      }
    ];
  }


  return {shippingAddress, orderedProducts, payments};
 }
}
