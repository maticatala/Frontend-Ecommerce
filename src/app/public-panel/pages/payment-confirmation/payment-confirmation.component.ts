import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit {
  // limpiar el carrito
  // limpiar el pedido pendiente del localstorage

  private cartService = inject(CartService);

  ngOnInit() {

    this.cartService.clearCart();

    const pendingMPOrderId = localStorage.getItem('pendingMPOrderId');
    const mpPaymentTimestamp = localStorage.getItem('mpPaymentTimestamp');

    if (pendingMPOrderId && mpPaymentTimestamp) {
      console.log('pendingMPOrderId:', pendingMPOrderId);
      console.log('mpPaymentTimestamp:', mpPaymentTimestamp);

      localStorage.removeItem('pendingMPOrderId');
      localStorage.removeItem('mpPaymentTimestamp');
    }
  }
}
