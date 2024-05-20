import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/app/environments/environments';
import { CartItem } from '../../interfaces/cart-item.interface';
import { CartService } from '../../services/cart.service';
import { tap } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  private cartService = inject(CartService);
  public readonly baseUrl : string = environment.baseUrl;
  public total: number = 0;
  public shoppingList: CartItem[] = [];
  public step = 2;

  constructor(private _formBuilder: FormBuilder) {
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

  changeQuantity(cartItem: CartItem, quantity: number) {
    const newQuantity = cartItem.quantity + quantity;

    if (newQuantity > 0 ) {
      this.cartService.addProduct({
        product: cartItem.product,
        quantity
      })
    }
  }

  removeShoppItem(product: Product) {
    this.cartService.removeProduct(product)
  }

  lastStep() {
    this.step --;
  }

  nextStep() {
    this.step ++;
  }
}
