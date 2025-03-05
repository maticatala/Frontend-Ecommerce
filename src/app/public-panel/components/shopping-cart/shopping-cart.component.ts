import { Component, OnInit, inject } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { CartService } from '../../services/cart.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { tap } from 'rxjs';
import { CartItem } from '../../interfaces/cart-item.interface';

@Component({
  selector: 'public-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private cartService = inject(CartService);
  public isExpanded: boolean = false;
  public shoppingList: CartItem[] = [];
  public total: number = 0;
  public readonly baseUrl : string = environment.baseUrl;

  constructor() {}

  ngOnInit(): void {
    this.cartService.products
    .pipe(
      tap(cartProducts => {
        this.total = cartProducts.reduce((prev, curr) => prev + curr.product.price * curr.quantity, 0);
      })
    )
    .subscribe({
      next: (cartProducts) => {
        this.shoppingList = cartProducts
      }
    })
  }

  removeShoppItem(product: Product) {

    this.cartService.removeProduct(product)
  }

  changeQuantity(cartItem: CartItem, quantity: number) {
    const newQuantity = cartItem.quantity + quantity;

    if (newQuantity > 0 ) {
      this.cartService.addProduct({
        product: cartItem.product,
        quantity
      })
    }
  }

  public toggleShoppingCart() {
    this.isExpanded = !this.isExpanded;
  }

  clearShoppingCart() {
    this.cartService.clearCart();
  }

}

