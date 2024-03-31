import { Component, Input, OnInit, inject } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'public-panel-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input()
  public product! : Product;


  public readonly baseUrl : string = environment.baseUrl;


}
