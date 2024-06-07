import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './layouts/layout-page/admin-layout-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { ListProductsPageComponent } from './pages/list-products-page/list-products-page.component';
import { AddEditProductComponent } from './pages/add-edit-product/add-edit-product.component';
import { isAdminGuard } from '../auth/guards/is-admin.guard';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';

const routes: Routes = [{
  path: '',
  canActivateChild: [isAdminGuard],
  component: LayoutPageComponent,
  children: [
    {path: 'users', component: UsersPageComponent},
    {path: 'categories', component: CategoriesPageComponent},
    {path: 'products', component: ListProductsPageComponent},
    {path: 'product/:id', component: AddEditProductComponent},
    {path: 'product', component: AddEditProductComponent},
    {path: 'orders', component: OrdersPageComponent},
    {path: 'order/:id', component: OrderPageComponent},
    {path: '**', redirectTo: 'orders'},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
