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

    setTimeout(() => {
      this.cartService.clearCart();
    } , 1000);
  }
}
