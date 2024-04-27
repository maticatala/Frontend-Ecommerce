import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  addToCart(product: any) {
    console.log('Agregando producto al carrito:', product);
  }

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() { }

  getProducts(): Observable<Product[]>  {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }




}
