import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './layouts/layout-page/admin-layout-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { ListProductsPageComponent } from './pages/list-products-page/list-products-page.component';
import { AddEditProductComponent } from './pages/add-edit-product/add-edit-product.component';
import { isAdminGuard } from '../auth/guards/is-admin.guard';

const routes: Routes = [{
  path: '',
  canActivateChild: [isAdminGuard],
  component: LayoutPageComponent,
  children: [
    {path: 'dashboard',component: DashboardPageComponent},
    {path: 'users', component: UsersPageComponent},
    {path: 'categories', component: CategoriesPageComponent},
    {path: 'products', component: ListProductsPageComponent},
    {path: 'product/:id', component: AddEditProductComponent},
    {path: 'product', component: AddEditProductComponent},
    {path: '**', redirectTo: 'dashboard'},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
