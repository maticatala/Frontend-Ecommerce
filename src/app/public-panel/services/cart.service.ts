import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CartItem } from '../interfaces/cart-item.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsService = inject(ProductsService);
  private _cusSnackbar = inject(CustomSnackbarService);
  private cartProducts: CartItem[] = [];
  private _products: BehaviorSubject<CartItem[]>;
  private cartItems: { [key: string]: number } = {};

  constructor() {
    this._products = new BehaviorSubject<CartItem[]>([]);
    this.loadProducts();
  }

  get products() {
    return this._products.asObservable();
  }

  private updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private updateProducts() {
    this._products.next(this.cartProducts);
  }

  loadProducts() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');

    const productIds = Object.keys(this.cartItems);

    if (productIds.length > 0) {
      productIds.forEach(productId => {
        const quantity = this.cartItems[productId];

        this.productsService.getProductById(+productId).subscribe({
          next: (product) => {
            this.cartProducts.push({ product, quantity });
            this.updateProducts();
          }, error: (err: any) => {
            delete this.cartItems[productId];
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
          }
        });

      });
    }
  }

  addProduct(cartItem: CartItem, snackbar?:boolean) {
    const existingCartItem = this.cartProducts.find(item => item.product.id === cartItem.product.id);

    if (existingCartItem) {
      existingCartItem.quantity += cartItem.quantity;
      this.cartItems[cartItem.product.id] += cartItem.quantity;
    } else {
      this.cartProducts.push(cartItem);
      this.cartItems[cartItem.product.id] = cartItem.quantity;
    }

    this.updateLocalStorage();
    this.updateProducts();

    if (snackbar) {
      this._cusSnackbar.openCustomSnackbar("done", `${cartItem.product.name} added successfuly!!`, "Okay", 3000, 'success');
    }
  }

  removeProduct(product: Product) {
    const index = this.cartProducts.findIndex(item => item.product.id === product.id);

    if (index > -1) {
      this.cartProducts.splice(index, 1);
      delete this.cartItems[product.id];

      this.updateLocalStorage();
      this.updateProducts();
    }
  }

  clearCart() {
    this.cartProducts = [];
    this.cartItems = {};

    this.updateLocalStorage();
    this.updateProducts();
  }
}
