import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { LayoutPageComponent } from './layouts/layout-page/admin-layout-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UserImagePipe } from './pipes/user-image.pipe';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table'


@NgModule({
  declarations: [
    LayoutPageComponent,
    DashboardPageComponent,
    UsersPageComponent,
    UserImagePipe,
    SideBarComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FontAwesomeModule,
    MatTableModule
  ]
})
export class AdminPanelModule { }
