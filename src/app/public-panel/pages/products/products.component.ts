import { Product } from './../../../shared/interfaces/product.interface';
import { Component, OnInit, effect, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Category } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'public-panel-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  public products?: Product[] | null;
  public categories : Category[] = [];

  private productService  = inject(ProductsService);
  private categoryService  = inject(CategoriesService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe();

    this.categoryService.getCategories()
      .subscribe( categories => {
        this.categories = categories
      });
  }

  public productListChangeEffect = effect (()=>{

    this.products = this.productService.productList();

  })

  // setProductList() {
  //   return this.productService.productList;
  // }
}
