import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLabelDirective } from './directives/custom-label.directive';
import { SharedTableComponent } from './components/shared-table/shared-table.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';

@NgModule({
  declarations: [
    CustomLabelDirective,
    SharedTableComponent,
    CustomSnackbarComponent,
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports: [
    CustomLabelDirective,
    SharedTableComponent,
    CustomSnackbarComponent,
    DialogConfirmComponent
  ]
})
export class SharedModule { }
