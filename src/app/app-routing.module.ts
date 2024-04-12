import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isNotAuthenticatedGuard, isAdminGuard } from './auth/guards';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'dashboard',
    // canActivate: [isAdminGuard],
    loadChildren: () => import('./admin-panel/admin-panel.module').then( m => m.AdminPanelModule ),
  },
  {
    path: '',
    loadChildren: () => import('./public-panel/public-panel.module').then( m => m.PublicPanelModule),
  },
  {
    path: '**',
    redirectTo: 'auth'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
