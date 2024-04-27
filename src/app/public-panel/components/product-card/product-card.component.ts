import { Component, Injectable, Input, OnInit, inject } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { Product } from 'src/app/shared/interfaces/product.interface';
import {ProductsService} from '../../services/products.service';
import { Observable, Subject } from 'rxjs';
import {AuthService} from '../../../auth/services/auth.service'

@Component({
  selector: 'public-panel-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ProductCardComponent {
  itemsCart:any = [];
  @Input()
  public product! : Product;

  public readonly baseUrl : string = environment.baseUrl;

  constructor(private productsService: ProductsService, private auth: AuthService) {}

  // Función para agregar un artículo al carrito
  addCart(product: any) {
    // Llama al servicio para agregar el producto al carrito
    this.productsService.addToCart(product);

    // Recupera los datos del carrito del localStorage
    let cartData: any[] = JSON.parse(localStorage.getItem('localCart') || '[]');

    this.cartNumberFunc();

    // Busca si el producto ya está en el carrito
    let index: number = cartData.findIndex(item => item.id === product.id);

    // Si el producto no está en el carrito, agrégalo
    if (index === -1) {
      cartData.push(product);
    } else {
      // Si el producto está en el carrito, actualiza su cantidad
      cartData[index].qnt = product.qnt;
    }


    // Vuelve a almacenar los datos del carrito en el localStorage
    localStorage.setItem('localCart', JSON.stringify(cartData));
  }

  cartNumber: number = 0;

cartNumberFunc(){
  var cartValue = localStorage.getItem('localCart');
  if (cartValue !== null) { // Verificar si cartValue no es null
    var cartData = JSON.parse(cartValue);
    this.cartNumber = cartData.length;
  } else {
    this.cartNumber = 0; // Si cartValue es null, establecer cartNumber en 0
  }
  this.auth.cartSubject.next(this.cartNumber);
}

}
