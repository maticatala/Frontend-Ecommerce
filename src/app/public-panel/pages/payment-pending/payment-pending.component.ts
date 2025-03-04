import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment-pending',
  templateUrl: './payment-pending.component.html',
  styleUrls: ['./payment-pending.component.css']
})
export class PaymentPendingComponent implements OnInit {

    private cartService = inject(CartService);

  ngOnInit() {

    // setTimeout(() => {
    //   this.cartService.clearCart();
    // } , 1000);
  }

}
