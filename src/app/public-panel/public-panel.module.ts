import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicPanelRoutingModule } from './public-panel-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutPageComponent } from './layouts/layout-page/layout-page.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoryComponent } from './pages/category/category.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    MainPageComponent,
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    LayoutPageComponent,
    ProductsComponent,
    CategoryComponent,
    ShoppingCartComponent,
    AboutUsComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    PublicPanelRoutingModule,
    MatIconModule,
  ]
})
export class PublicPanelModule { }
