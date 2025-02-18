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
  public payment: Payment = inject(MAT_DIALOG_DATA);
  public paymentStatus = PaymentStatus;

  public paymentInitialStatus: any;

  constructor(){
    this.paymentInitialStatus = this.payment.status;
  }

  updatePaymentStatus(){

    this.orderService.updatePaymentStatus(this.payment.id, {status: this.paymentInitialStatus}).subscribe({
      next: (payment) => {
        this._cusSnackbar.openCustomSnackbar("done", `${payment.status} correctamente!`, "Okay", 3000, 'success');
      }, error: (e) => {
        const message = e.error.message;
        this._cusSnackbar.openCustomSnackbar("error", message, "Ok", 3000, 'danger');
      }
    });

  }
}
