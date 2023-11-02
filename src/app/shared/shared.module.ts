import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLabelDirective } from './directives/custom-label.directive';
import { SharedTableComponent } from './components/shared-table/shared-table.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [
    CustomLabelDirective,
    SharedTableComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports: [
    CustomLabelDirective,
    SharedTableComponent
  ]
})
export class SharedModule { }
