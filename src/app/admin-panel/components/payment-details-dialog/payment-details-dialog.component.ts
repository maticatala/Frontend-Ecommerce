import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payment } from '../../interfaces/order.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';
import { PaymentStatus } from '../../enums/payment-status.enum';

@Component({
  selector: 'app-payment-details-dialog',
  templateUrl: './payment-details-dialog.component.html',
  styleUrls: ['./payment-details-dialog.component.css']
})
export class PaymentDetailsDialogComponent {

  private orderService = inject(OrdersService);
  private _cusSnackbar = inject(CustomSnackbarService);
  public payment = inject(MAT_DIALOG_DATA);
  public paymentStatus = PaymentStatus;

  public paymentInitialStatus: any;

  constructor(){
    this.paymentInitialStatus = this.payment.status;
  }

  updatePaymentStatus(){

    this.orderService.updatePaymentStatus(this.payment.id, {status: this.paymentInitialStatus}).subscribe({
      next: (payment) => {
        this._cusSnackbar.openCustomSnackbar("done", `${this.getPaymentStatusName(payment.status)} correctamente!`, "Okay", 3000, 'success');
      }, error: (e) => {
        const message = e.error.message;
        this._cusSnackbar.openCustomSnackbar("error", message, "Ok", 3000, 'danger');
      }
    });

  }

  paymentMethodNames: Record<string, string> = {
    credit_card: 'Tarjeta de Crédito',
    debit_card: 'Tarjeta de Débito',
    ticket: 'Boleto/Ticket'
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
    rapipago: 'Rapipago'
  };

  getPaymentMethodName(methodType: string): string {
    return this.paymentMethodNames[methodType] || methodType;
  }

  getFinancialSystemName(financialSystem: string): string {
    return this.financialSystemNames[financialSystem] || financialSystem;
  }

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

  getPaymentStatusName(status: string): string {
    return this.paymentStatusNames[status] || status;
  }

}
