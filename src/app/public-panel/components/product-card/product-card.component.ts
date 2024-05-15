import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environments';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'public-panel-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  private router = inject(Router);

  @Input()
  public product! : Product;

  public readonly baseUrl : string = environment.baseUrl;

  contadorCarrito: number = 0;

  constructor() { }

  // Función para agregar un artículo al carrito
  agregarAlCarrito() {
    // Incrementa el contador de carrito cada vez que se agrega un artículo
    this.contadorCarrito++;
    console.log(this.product)
  }

  showProduct() {
    this.router.navigate(['/product', this.product.id]);
  }

}
