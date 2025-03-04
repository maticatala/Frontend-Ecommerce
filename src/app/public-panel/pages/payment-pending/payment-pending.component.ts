import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-payment-pending',
  templateUrl: './payment-pending.component.html',
  styleUrls: ['./payment-pending.component.css']
})
export class PaymentPendingComponent implements OnInit {

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
