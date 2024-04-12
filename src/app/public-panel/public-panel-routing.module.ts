import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductsComponent } from './pages/products/products.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LayoutPageComponent } from './layouts/layout-page/layout-page.component';

const routes: Routes = [{
  path: '',
  component: LayoutPageComponent,
  children: [
    {path: 'home', component: MainPageComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'category', component: CategoryComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'shopping-cart', component: ShoppingCartComponent},
    {path: 'contact', component: ContactComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '**', redirectTo: 'home'},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicPanelRoutingModule { }
