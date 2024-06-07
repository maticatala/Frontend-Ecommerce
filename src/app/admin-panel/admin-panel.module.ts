import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { LayoutPageComponent } from './layouts/layout-page/admin-layout-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UserImagePipe } from './pipes/user-image.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { UserAddEditComponent } from './components/user-add-edit/user-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './components/side-nav-left/side-nav/side-nav.component';
import { SideNavClosedComponent } from './components/side-nav-left/side-nav-closed/side-nav-closed.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { CategoryAddEditComponent } from './components/category-add-edit/category-add-edit.component';
import { ListProductsPageComponent } from './pages/list-products-page/list-products-page.component';
import { AddEditProductComponent } from './pages/add-edit-product/add-edit-product.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { PaymentDetailsDialogComponent } from './components/payment-details-dialog/payment-details-dialog.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    UsersPageComponent,
    UserImagePipe,
    UserAddEditComponent,
    SideNavComponent,
    SideNavClosedComponent,
    TopNavComponent,
    CategoriesPageComponent,
    CategoryAddEditComponent,
    ListProductsPageComponent,
    AddEditProductComponent,
    OrdersPageComponent,
    OrderPageComponent,
    PaymentDetailsDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FontAwesomeModule,
    AngularMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class AdminPanelModule { }
