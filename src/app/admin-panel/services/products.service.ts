import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() { }

  getProducts(): Observable<Product[]>  {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProductById(productId: number) {
    return this.http.get<Product>(`${this.baseUrl}/products/${productId}`);
  }

  createProduct(data: any, file: File): Observable<Product>  {

    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    })

    const body = this.createFormData(data, file);

    return this.http.post<Product>(`${this.baseUrl}/products`, body, { headers });

  }

  updateProduct(id:number, data: any, file?: File): Observable<Product> {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    })

    const body = this.createFormData(data, file);

    return this.http.patch<Product>(`${this.baseUrl}/products/${id}`, body, {headers});
  }

  deleteProduct(id: number) {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.http.patch(`${this.baseUrl}/products/delete/${id}`, {}, {headers});
  }

  createFormData(data: any, file?: File) {
    const formData = new FormData();

    if (file) formData.append('file', file); // Agrega la imagen al FormData

    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);

    for (var i = 0; i < data.categoriesIds.length; i++) {
      formData.append('categoriesIds[]', data.categoriesIds[i]);
    }

    return formData;
  }


}
