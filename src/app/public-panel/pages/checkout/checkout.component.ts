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
import { Router, ActivatedRoute } from '@angular/router';
import { MercadoPagoService } from '../../services/mercadopago.service';

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
  private mercadoPagoService = inject(MercadoPagoService);
  private route = inject(ActivatedRoute);

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

    this.validateOrderPending();
  }


  validateOrderPending() {

    // Verificar si se viene de una redirección de failure para limpiar localStorage (manda cleanPendingOrder en la url)
    this.route.queryParams.subscribe(params => {
      // console.log('params:', params);
      if (params['cleanPendingOrder'] === 'true') {
        // console.log('cleanPendingOrder:', params['cleanPendingOrder']);
        localStorage.removeItem('pendingMPOrderId');
        localStorage.removeItem('mpPaymentTimestamp');

        this._cusSnackbar.openCustomSnackbar("warning",'Se canceló el proceso de pago',"Ok",3000,'warning');

        // Limpiar el parámetro de la URL para evitar que se dispare nuevamente si el usuario recarga
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { cleanPendingOrder: null },
          queryParamsHandling: 'merge'
        });
      }
    });

    // Verificar si hay un pedido pendiente (posible navegación con botón "atrás")
    const pendingOrderId = localStorage.getItem('pendingMPOrderId');
    const paymentTimestamp = localStorage.getItem('mpPaymentTimestamp');

    if (pendingOrderId && paymentTimestamp) {
      console.log('pendingOrderId:', pendingOrderId);
      console.log('mpPaymentTimestamp:', paymentTimestamp);

      const timeElapsed = Date.now() - parseInt(paymentTimestamp);
      // Si han pasado menos de 30 minutos, probablemente el usuario usó el botón "atrás"
      if (timeElapsed < 30 * 60 * 1000) {
        // Eliminar el pedido pendiente
        this.orderService.deleteOrder(parseInt(pendingOrderId)).subscribe({
          next: () => {
            console.log('Pedido eliminado por navegación hacia atrás');
            localStorage.removeItem('pendingMPOrderId');
            localStorage.removeItem('mpPaymentTimestamp');
            this._cusSnackbar.openCustomSnackbar("warning", 'Se canceló el proceso de pago', "Ok", 3000, 'warning');
          },
          error: (e) => {
            console.error('Error al eliminar pedido pendiente:', e);
            localStorage.removeItem('pendingMPOrderId');
            localStorage.removeItem('mpPaymentTimestamp');
          }
        });
      } else {
        // Si ha pasado mucho tiempo, simplemente limpiar localStorage
        localStorage.removeItem('pendingMPOrderId');
        localStorage.removeItem('mpPaymentTimestamp');
      }
    }
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

    if (this.shoppingList.length === 0) {
      this._cusSnackbar.openCustomSnackbar("error", 'No hay productos en el carrito', "Ok", 3000, 'danger');
      this.router.navigate(['/products']);
    }
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
    if(this.shoppingList.length === 0) {
      this._cusSnackbar.openCustomSnackbar("error", 'No hay productos en el carrito', "Ok", 3000, 'danger');
      this.router.navigate(['/products']);
    };
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
        // this._cusSnackbar.openCustomSnackbar("error", 'En proceso...', "Ok", 3000, 'warning');
        this.payWithMercadoPago();
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
      this._cusSnackbar.openCustomSnackbar("error", e.error.message, "Ok", 3000, 'danger');
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
  }else if (this.paymentMethod === 'mercadoPago') {
    payments = [
      {
        paymentType: "mercadopago",
        amount: this.total,
        currency: "ARS",
      }
    ];
  }


  return {shippingAddress, orderedProducts, payments};
 }

 payWithMercadoPago() {

  // const items: ItemMP[] = this.shoppingList.map(item => ({
  //   id: item.product.id.toString(),
  //   title: item.product.name,
  //   unit_price: item.product.price,
  //   quantity: item.quantity,
  //   currency_id: 'ARS',
  // }));

  // const {name, lastName} = this.myForm.value;
  // const email = this.authService.getEmail(); // Obtener el email del usuario autenticado
  // const payer = {
  //   name,
  //   lastName,
  //   email,
  // };

  this.mercadoPagoService.checkout(this.orderData())
  .subscribe({
  next: (response) => {
  // Guardar el ID del pedido en localStorage antes de redirigir
  localStorage.setItem('pendingMPOrderId', response.orderId.toString());
  localStorage.setItem('mpPaymentTimestamp', Date.now().toString());

  console.log('pendingMPOrderId:', response.orderId.toString());
  console.log('mpPaymentTimestamp:', Date.now().toString());

  window.location.href = response.init_point; // Redirige a Mercado Pago
  },
  error: (e) => {
    this._cusSnackbar.openCustomSnackbar("error", 'Error al iniciar pago', "Ok", 3000, 'danger');
  }
  });
 }


}
