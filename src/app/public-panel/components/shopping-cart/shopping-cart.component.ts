import { Component, effect, inject } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'public-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  private productService = inject(ProductsService);
  public isExpanded: boolean = false;
  public shoppingList: { product: any, quantity: number }[] = [];
  public total: number = 0;
  public readonly baseUrl : string = environment.baseUrl;

  constructor() {
    this.productService._productCartList.subscribe(cartItems => {
      this.searchProducts(cartItems);
    });
  }

  searchProducts(cartItems: any){
    this.shoppingList = [];
    this.total = 0;

    Object.keys(cartItems).forEach(productId => {
      this.productService.getProductById(+productId).subscribe({
        next: (product) => {
          const item = {
            product: product,
            quantity: cartItems[productId]
          };
          this.total += +item.product.price * item.quantity;
          this.shoppingList.push(item);
        },
        error: (error) => {
          console.log(error)
        }
      });
    });
  }


  removeShoppItem(id: any) {
    this.productService.removeProductFromCart(id);
  }

  decreaseQuantity(productId: number) {
    this.productService.pushProductCartList(productId, -1);
  }

  increaseQuantity(productId: number) {
    this.productService.pushProductCartList(productId, +1);
  }


  public toggleShoppingCart() {
    this.isExpanded = !this.isExpanded;
  }

}

