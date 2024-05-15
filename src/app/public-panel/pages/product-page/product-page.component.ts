import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environments';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  public readonly baseUrl : string = environment.baseUrl;
  public product?: Product;

  public amount: number = 1;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];

      this.productsService.getProductById(productId).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (error) => {
          console.log(error)
        }
      })

    });
  }

  increment() {
    this.amount = this.amount + 1;
  }

  reduce() {
    if (this.amount >= 1 ) this.amount = this.amount - 1;
  }

  addCart() {
    if (this.product){
      this.productsService.pushProductCartList(this.product.id, this.amount);
    }
  }

}
