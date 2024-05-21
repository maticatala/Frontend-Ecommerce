import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/app/environments/environments';
import { CartItem } from '../../interfaces/cart-item.interface';
import { CartService } from '../../services/cart.service';
import { tap } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  private cartService = inject(CartService);
  private orderService = inject(OrdersService);
  public readonly baseUrl : string = environment.baseUrl;
  public total: number = 0;
  public shoppingList: CartItem[] = [];
  public step = 1;
  public paymentMethod: string = '';

  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    name:     ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone:    ['', [Validators.required]],
    address:  ['', [Validators.required]],
    floor :   [''],
    flat:     [''],
    postCode: ['', [Validators.required]],
    city:     ['', [Validators.required]],
    state:    ['', [Validators.required]],
    country:  ['', [Validators.required]],
  });


  constructor(private _formBuilder: FormBuilder) {
    this.cartService.products
    .pipe(
      tap(cartProducts => {
        this.total = cartProducts.reduce((prev, curr) => prev + curr.product.price * curr.quantity, 0);
      })
    )
    .subscribe({
      next: (cartProducts) => {
        this.shoppingList = cartProducts
      }
    })
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

  lastStep() {
    this.step --;
  }

  nextStep() {
    if (this.step === 2 && this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    } else if (this.step === 3) {

      if (this.paymentMethod === 'efectivo') {
        this.orderService.createOrder(this.orderData()).subscribe({
          next: (repsonse) => {
            console.log("Pedido creado con exito: ", repsonse);
          }
        })
      }

    } else {
      this.step ++;
    }
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

  return {shippingAddress, orderedProducts};
 }
}
