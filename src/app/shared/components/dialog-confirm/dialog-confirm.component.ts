import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent {
  // private _dialogRef = inject(MatDialogRef<UserAddEditComponent>);

  public data = inject(MAT_DIALOG_DATA);
  private _dialogRef = inject(MatDialogRef<DialogConfirmComponent>)

  onTrue() {
    return this._dialogRef.close(true);
  };

}
