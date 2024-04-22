import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public productList : Product[] = [];

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private _tagHistory : string[] = [];


  constructor() { }

  get tagsHistory(){
    return [...this._tagHistory];
  }

  getProducts(): Observable<Product[]>  {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  // getProductsByName(name : string) : Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.baseUrl}/products/search?&name=${name}`)
  // }

  private organizeHistory( tag: string ){

    tag = tag.toLowerCase();

    if( this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter( (oldTag) => oldTag != tag )
    }

    this._tagHistory.unshift(tag);

    this._tagHistory = this.tagsHistory.splice(0,5);

  }

  searchTag( tag : string ) : void {

    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('limit', 2)
      .set('name', tag)

    this.http.get<Product[]>(`${this.baseUrl}/products/search`,{ params })
      .subscribe( resp => {
        this.productList = resp

        console.log({prodcuts : this.productList})

      })
  }

  searchProductByCategory( tag : string ) : void {

    const params = new HttpParams()
      .set('limit', 2)
      .set('categoryName', tag)

    this.http.get<Product[]>(`${this.baseUrl}/products/category`,{ params })
      .subscribe( resp => {
        this.productList = resp

        console.log({prodcuts : this.productList})

      })
  }



}
