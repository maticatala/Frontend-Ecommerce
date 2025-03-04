import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatus } from 'src/app/admin-panel/enums/order-status.enum';
import { PaymentStatus } from 'src/app/admin-panel/enums/payment-status.enum';
import { Order } from 'src/app/admin-panel/interfaces/order.interface';
import { environment } from 'src/app/environments/environments';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private ordersService = inject(OrdersService);
  public order?: Order;
  public unAuthorized: boolean = false;
  public readonly baseUrl: string = environment.baseUrl;

  constructor() {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');

    if (!orderId) return;

    this.ordersService.getUserOrderById(+orderId).subscribe({
      next: (order) => {
        order.total = order.products.reduce((sum, product) => {
          return sum + product.product_unit_price * product.product_quantity;
        }, 0);
        this.order = order;
      },
      error: (e) => {
        this.unAuthorized = true;
        const message = e.error.message;
        console.log(message);
      },
    });
  }

  setOrderStatusColor(status: OrderStatus): string {
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
      [PaymentStatus.CANCELLED]: 'text-danger bg-red-50 font-bold',
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
    [PaymentStatus.CANCELLED]: 'Cancelado',
  };

  getOrderStatusName(status: string): string {
    return this.orderStatusNames[status] || status;
  }

  getPaymentStatusName(status: string): string {
    return this.paymentStatusNames[status] || status;
  }


  paymentMethodNames: Record<string, string> = {
    credit_card: 'Tarjeta de Crédito',
    debit_card: 'Tarjeta de Débito',
    ticket: 'Boleto/Ticket',
  };

  financialSystemNames: Record<string, string> = {
    visa: 'Visa',
    master: 'Mastercard',
    amex: 'American Express',
    tarshop: 'Tarjeta Shopping',
    cabal: 'Cabal',
    diners: 'Diners',
    maestro: 'Maestro',
    debmaster: 'Mastercard Débito',
    debvisa: 'Visa Débito',
    pagofacil: 'Pago Fácil',
    rapipago: 'Rapipago',
  };

  getPaymentMethodName(methodType: string): string {
    return this.paymentMethodNames[methodType] || methodType;
  }

  getFinancialSystemName(financialSystem: string): string {
    return this.financialSystemNames[financialSystem] || financialSystem;
  }
}
