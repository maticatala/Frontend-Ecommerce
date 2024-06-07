import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from './custom-snackbar.component';
import { typeSnackbar } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {

  private _snackbar = inject(MatSnackBar)

  openCustomSnackbar(icon:string, message: string, action:string, duration:number, type:typeSnackbar) {
    this._snackbar.openFromComponent(CustomSnackbarComponent, {
      data: {
        icon,
        message,
        action,
        snackbar: this._snackbar
      },
      duration,
      panelClass: [`${type}-snackbar`, `${type}-color-snackbar`]
    });

  }
}
