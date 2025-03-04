import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit {

  private cartService = inject(CartService);
  private orderService = inject(OrdersService);

  orderId: String = '';

  ngOnInit() {
    setTimeout(() => {
      this.cartService.clearCart();
    });
    this.orderService.getLastOrderId().subscribe({
      next: (response => {
        this.orderId = response.id;
      })
    })
  }
}
