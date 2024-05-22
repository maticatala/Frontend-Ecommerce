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
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '**', redirectTo: 'home'},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicPanelRoutingModule { }
