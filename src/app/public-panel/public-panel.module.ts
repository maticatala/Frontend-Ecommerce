import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicPanelRoutingModule } from './public-panel-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';


@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    PublicPanelRoutingModule
  ]
})
export class PublicPanelModule { }
