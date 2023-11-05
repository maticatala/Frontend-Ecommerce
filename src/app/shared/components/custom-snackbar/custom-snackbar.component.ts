import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'shared-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.css']
})
export class CustomSnackbarComponent {

  public data = inject(MAT_SNACK_BAR_DATA);

  closeSnackbar() {
    this.data.snackbar.dismiss();
  }
}
