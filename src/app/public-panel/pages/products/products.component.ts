import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  public products : Product[] = [];

  private productService  = inject(ProductsService);

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe( products => {
        this.products = products
        console.log(this.products[0]);
      });
  }



}
