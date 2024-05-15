import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private _tagHistory : string[] = [];
  private _productList = signal<Product[] | null>(null);
  public _productCartList = new BehaviorSubject<any>(null);

  //! Al mundo exterior
  public productList = computed( () => this._productList() );

  constructor() {
    this.loadProductDetails()
  }

  private loadProductDetails() {
    let cartItems: { [key: string]: number } = JSON.parse(localStorage.getItem('cartItems') || '{}');
    if (cartItems){
      this._productCartList.next(cartItems);
    }
  }

  public pushProductCartList(id: number, amount: number) {
    let cartItems: { [key: string]: number } = JSON.parse(localStorage.getItem('cartItems') || '{}');
    if (cartItems[id]) {
      // Si el producto ya está en el carrito, sumar la cantidad existente
      cartItems[id] = (cartItems[id] === 1 && amount < 0) ? 1 : cartItems[id] + amount;
    } else {
      // Si el producto no está en el carrito, agregarlo con la cantidad proporcionada
      cartItems[id] = amount;
    }
      // Guardar los elementos actualizados del carrito en el localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));


    console.log("cambiando _productCartList");
    this._productCartList.next(cartItems);
  }

  public removeProductFromCart(id: number) {
    // Obtener los elementos actuales del carrito del localStorage
    let cartItems: { [key: string]: number } = JSON.parse(localStorage.getItem('cartItems') || '{}');

    // Verificar si el producto con el id proporcionado está en el carrito
    if (cartItems[id]) {
      // Si el producto está en el carrito, eliminarlo
      delete cartItems[id];

      // Actualizar el localStorage con los elementos modificados del carrito
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // Emitir el cambio a través del BehaviorSubject _productCartList
      this._productCartList.next(cartItems);
    }
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

  get tagsHistory(){
    return [...this._tagHistory];
  }

  private organizeHistory( tag: string ){

    tag = tag.toLowerCase();

    if( this._tagHistory.includes(tag) ){
      this._tagHistory = this._tagHistory.filter( (oldTag) => oldTag != tag )
    }

    this._tagHistory.unshift(tag);

    this._tagHistory = this.tagsHistory.splice(0,5);

  }

  getProductsByParams( params: HttpParams ) {

    const tag = params.get('name');

    if (tag)
    this.organizeHistory(tag);

    return this.http.get<any>(`${this.baseUrl}/products`,{ params })
      .pipe(
        tap(response => {
          this._productList.set(response.data)
        })
      )

  }

  getProducts()  {
    return this.http.get<Product[]>(`${this.baseUrl}/products/all`)
    .pipe(
      map(products => {
        this._productList.set(products);
        return true;
      }),
    )
  }

}
