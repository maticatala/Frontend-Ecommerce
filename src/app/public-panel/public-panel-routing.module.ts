import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProductsComponent } from './pages/products-page/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LayoutPageComponent } from './layouts/layout-page/layout-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { isAuthenticatedGuard } from '../auth/guards';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { PaymentConfirmationComponent } from './pages/payment-confirmation/payment-confirmation.component';

const routes: Routes = [{
  path: '',
  component: LayoutPageComponent,
  children: [
    {path: 'home', component: MainPageComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'product/:id', component: ProductPageComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'checkout', canActivate: [isAuthenticatedGuard], component: CheckoutComponent},
    {path: 'payment-confirmation', component: PaymentConfirmationComponent},
    {path: 'orders', canActivate: [isAuthenticatedGuard], component: OrdersPageComponent},
    {path: 'orders/:orderId', canActivate: [isAuthenticatedGuard], component: OrderPageComponent},
    {path: 'profile', canActivate: [isAuthenticatedGuard], component: ProfilePageComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '**', redirectTo: '/'},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicPanelRoutingModule { }
