import { Product } from './../../../shared/interfaces/product.interface';
import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Category } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'public-panel-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  // public products : Product[] = [];
  public categories : Category[] = [];

  private productService  = inject(ProductsService);
  private categoryService  = inject(CategoriesService);

  ngOnInit(): void {
    // this.productService.getProducts()
    //   .subscribe( products => {
    //     this.products = products
    //   });

    this.categoryService.getCategories()
      .subscribe( categories => {
        this.categories = categories
      });
  }

  get products() : Product[]{
    return this.productService.productList;
  }

}
