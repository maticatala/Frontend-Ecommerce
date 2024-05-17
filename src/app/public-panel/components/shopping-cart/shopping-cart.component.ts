import { Component, HostListener, OnInit, effect, inject } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CartService } from '../../services/cart.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'public-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private cartService = inject(CartService);
  public isExpanded: boolean = false;
  public shoppingList: { product: any, quantity: number }[] = [];
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

  changeQuantity(shopItem: any, quantity: number) {
    const newQuantity = shopItem.quantity + quantity;

    if (newQuantity > 0 ) {
      this.cartService.addProduct({
        product: shopItem.product,
        quantity
      })
    }
  }

  public toggleShoppingCart() {
    this.isExpanded = !this.isExpanded;
  }

}

