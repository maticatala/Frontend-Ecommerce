import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './layouts/layout-page/admin-layout-page.component';
import { isAdminGuard, isAuthenticatedGuard } from '../auth/guards';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

const routes: Routes = [{
  path: '',
  component: LayoutPageComponent,
  canActivate: [isAdminGuard, isAuthenticatedGuard],
  children: [
    {path: 'dashboard',component: DashboardPageComponent},
    {path: 'users', component: UsersPageComponent},
    {path: '**', redirectTo: 'dashboard'},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
