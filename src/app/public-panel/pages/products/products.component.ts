import { HttpParams } from '@angular/common/http';
import { Component, OnInit, effect, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/admin-panel/services/categories.service';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'public-panel-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  public categories : Category[] = [];

  private productService  = inject(ProductsService);
  private categoryService  = inject(CategoriesService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(parameters => {
        const params = new HttpParams({ fromObject: parameters });
        this.productService.getProductsByParams(params).subscribe();
    })

    this.categoryService.getCategories()
      .subscribe( categories => {
        this.categories = categories
      });
  }

  get products() {
    return this.productService.productList();
  }

  searchCategory(id: number){

    this.router.navigate(['products'], {
      queryParams: { category: id },
      queryParamsHandling: 'merge'
    });

  }

}
