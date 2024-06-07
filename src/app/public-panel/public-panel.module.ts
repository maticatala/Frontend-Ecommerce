import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicPanelRoutingModule } from './public-panel-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
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
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UserPanelLayoutComponent } from './layouts/user-panel-layout/user-panel-layout.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';



@NgModule({
  declarations: [
    MainPageComponent,
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
    CheckoutComponent,
    ProfilePageComponent,
    OrdersPageComponent,
    SideBarComponent,
    UserPanelLayoutComponent,
    OrderPageComponent
  ],
  imports: [
    CommonModule,
    PublicPanelRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class PublicPanelModule { }
