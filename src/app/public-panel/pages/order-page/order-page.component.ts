import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatus } from 'src/app/admin-panel/enums/order-status.enum';
import { PaymentStatus } from 'src/app/admin-panel/enums/payment-status.enum';
import { Order } from 'src/app/admin-panel/interfaces/order.interface';
import { environment } from 'src/app/environments/environments';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private ordersService = inject(OrdersService);
  public order?: Order;
  public unAuthorized: boolean = false;
  public readonly baseUrl : string = environment.baseUrl;

  constructor(){}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');

    if (!orderId) return;

    this.ordersService.getUserOrderById(+orderId).subscribe({
      next: (order) => {
        order.total = order.products.reduce((sum, product) => {
          return sum + (product.product_unit_price * product.product_quantity);
        }, 0);
        this.order = order;
      },
      error: (e) => {
        this.unAuthorized = true;
        const message = e.error.message;
        console.log(message);
      }
    })

  }

  setOrderStatusColor(status:OrderStatus): string {
    const statusClasses = {
      [OrderStatus.CANCELLED]: 'text-danger bg-red-50 font-bold',
      [OrderStatus.PROCESSING]: 'text-warning bg-yellow-50 font-bold',
      [OrderStatus.DELIVERED]: 'text-success bg-green-50 font-bold',
      [OrderStatus.SHIPPED]: 'text-info bg-blue-50 font-bold',
    };

    return statusClasses[status];
  }

  setPaymentStatusColor(status: PaymentStatus): string {
    const statusClasses = {
      [PaymentStatus.FAILED]: 'text-danger bg-red-50 font-bold',
      [PaymentStatus.REFUNDED]: 'text-warning bg-yellow-50 font-bold',
      [PaymentStatus.COMPLETED]: 'text-success bg-green-50 font-bold',
      [PaymentStatus.PENDING]: 'text-info bg-blue-50 font-bold',
    };

    return statusClasses[status] || 'text-success bg-green-50 font-bold' ;
   }

}
