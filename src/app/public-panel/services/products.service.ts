import { Injectable, computed, inject, signal} from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private _tagHistory : string[] = [];
  private _productList = signal<Product[] | null>(null);

  //! Al mundo exterior
  public productList = computed( () => this._productList() );

  constructor() { }

  get tagsHistory(){
    return [...this._tagHistory];
  }

  getProducts()  {
    console.log("ejecutando get Products")
    return this.http.get<Product[]>(`${this.baseUrl}/products`)
    .pipe(
      map(products => {
        this._productList.set(products);
        return true;
      }),
    )
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

    return this.http.get<Product[]>(`${this.baseUrl}/products`,{ params })
      .pipe(
        map(products => {
          this._productList.set(products);
          console.log("products en getProductsByParams: ",products)
          return true;
        }),
      )

  }


}
