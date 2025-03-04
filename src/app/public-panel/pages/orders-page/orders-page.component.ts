import { Component, OnInit, inject } from '@angular/core';
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
      [PaymentStatus.REJECTED]: 'text-danger bg-red-50 font-bold',
      [PaymentStatus.APPROVED]: 'text-success bg-green-50 font-bold',
      [PaymentStatus.IN_PROCESS]: 'text-info bg-blue-50 font-bold',
    };

    return statusClasses[status] || 'text-success bg-green-50 font-bold';
  }

  orderStatusNames: Record<string, string> = {
    [OrderStatus.PROCESSING]: 'En Proceso',
    [OrderStatus.SHIPPED]: 'Enviado',
    [OrderStatus.DELIVERED]: 'Entregado',
    [OrderStatus.CANCELLED]: 'Cancelado',
  };

  paymentStatusNames: Record<string, string> = {
    [PaymentStatus.PENDING]: 'Pendiente',
    [PaymentStatus.REJECTED]: 'Rechazado',
    [PaymentStatus.COMPLETED]: 'Completado',
    [PaymentStatus.FAILED]: 'Fallido',
    [PaymentStatus.REFUNDED]: 'Reembolsado',
    [PaymentStatus.APPROVED]: 'Aprobado',
    [PaymentStatus.IN_PROCESS]: 'En Proceso',
  };

  getOrderStatusName(status: string): string {
    return this.orderStatusNames[status] || status;
  }

  getPaymentStatusName(status: string): string {
    return this.paymentStatusNames[status] || status;
  }


}
