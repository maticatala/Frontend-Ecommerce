import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environments';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/cart-item.interface';

@Component({
  selector: 'public-panel-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  private router = inject(Router);
  private cartService = inject(CartService);

  @Input()
  public product! : Product;

  public readonly baseUrl : string = environment.baseUrl;

  constructor() { }

  showProduct() {
    this.router.navigate(['/product', this.product.id]);
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToCart(event: MouseEvent) {
    const cartItem: CartItem = {
      product: this.product,
      quantity: 1
    }

    event.stopPropagation();

    this.cartService.addProduct(cartItem, true);
  }
}
