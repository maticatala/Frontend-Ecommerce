import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicPanelRoutingModule } from './public-panel-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutPageComponent } from './layouts/layout-page/layout-page.component';
import { ProductsComponent } from './pages/products-page/products.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ContactComponent } from '../public-panel/pages/contact/contact.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    MainPageComponent,
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    LayoutPageComponent,
    ProductsComponent,
    AboutUsComponent,
    ProductCardComponent,
    ContactComponent,
    CarouselComponent,
    SearchBarComponent,
    ProductPageComponent,
    ShoppingCartComponent,
  ],
  imports: [
    CommonModule,
    PublicPanelRoutingModule,
    AngularMaterialModule,
  ]
})
export class PublicPanelModule { }
