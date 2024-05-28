import { Component, OnInit, inject } from '@angular/core';
import { tap } from 'rxjs';
import { OrderStatus } from 'src/app/admin-panel/enums/order-status.enum';
import { PaymentStatus } from 'src/app/admin-panel/enums/payment-status.enum';
import { Order } from 'src/app/admin-panel/interfaces/order.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit{

  private ordersService = inject(OrdersService);
  public userOrders?: Order[];
  public unAuthorized: boolean = false;

  constructor(){}

  ngOnInit(): void {
    this.ordersService.getUserOrders().subscribe({
      next: (orders: Order[]) => {
        orders.forEach(order => {
          order.total = order.products.reduce((sum, product) => {
            return sum + (product.product_unit_price * product.product_quantity);
          }, 0);
        })
        this.userOrders = orders.reverse();
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
      [OrderStatus.CANCELLED]: 'text-danger bg-red-50',
      [OrderStatus.PROCESSING]: 'text-warning bg-yellow-50',
      [OrderStatus.DELIVERED]: 'text-success bg-green-50',
      [OrderStatus.SHIPPED]: 'text-info bg-blue-50',
    };

    return statusClasses[status];
  }

  setPaymentStatusColor(status: PaymentStatus): string {
    const statusClasses = {
      [PaymentStatus.FAILED]: 'text-danger bg-red-50',
      [PaymentStatus.REFUNDED]: 'text-warning bg-yellow-50',
      [PaymentStatus.COMPLETED]: 'text-success bg-green-50',
      [PaymentStatus.PENDING]: 'text-info bg-blue-50',
    };

    return statusClasses[status];
  }


}
