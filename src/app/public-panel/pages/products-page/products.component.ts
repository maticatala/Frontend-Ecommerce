import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, inject, ChangeDetectionStrategy, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/admin-panel/services/categories.service';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'public-panel-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit{

  public categories : Category[] = [];

  private productService  = inject(ProductsService);
  private categoryService  = inject(CategoriesService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  public isFilterOn = false;
  public selectedCategoryName?: string;
  public meta:any = null;
  public pageEvent?: PageEvent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public sortingOptions = [
    {
      value: {
        orderBy: null,
        sortOrder: null
      },
      label: 'None'
    },
    {
      value: {
        orderBy: 'price',
        sortOrder: 'ASC'
      },
      label: 'Precio: menor a mayor'
    },
    {
      value: {
        orderBy: 'price',
        sortOrder: 'DESC'
      },
      label: 'Precio: mayor a menor'
    },
    {
      value: {
        orderBy: 'name',
        sortOrder: 'ASC'
      },
      label: 'Alfabeticamente: A-Z'
    },
    {
      value: {
        orderBy: 'name',
        sortOrder: 'DESC'
      },
      label: 'Alfabeticamente: Z-A'
    },
    {
      value: {
        orderBy: 'createdAt',
        sortOrder: 'DESC'
      },
      label: 'Fecha: reciente'
    },
    {
      value: {
        orderBy: 'createdAt',
        sortOrder: 'ASC'
      },
      label: 'Fecha: antiguo'
    }
  ];


  ngOnInit(): void {

    this.activatedRoute.queryParams.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(parameters => {
        let params = new HttpParams({ fromObject: parameters });

            // Verificar si 'page' no está presente en los parámetros
        if (!params.has('page')) {
          params = params.set('page', '1'); // Establecer 'page' en 1
        }

        // Verificar si 'pageSize' no está presente en los parámetros
        if (!params.has('pageSize')) {
          // Obtener el primer valor de pageSizeOptions del mat paginator
          const firstPageSizeOption = '8'; // Cambia '10' al primer valor de tu pageSizeOptions
          params = params.set('pageSize', firstPageSizeOption); // Establecer 'pageSize' en el primer valor
        }

        this.productService.getProductsByParams(params).pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe({
          next: (response) => {
            this.meta = response.meta;
            this.cdr.markForCheck();
          }
        });
    })

    this.categoryService.getCategories().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe( categories => {
      this.categories = categories;
      this.cdr.markForCheck();
    });
  }

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let pageSize = event.pageSize;

    page = page + 1;

    this.router.navigate(['products'], {
      queryParams: { page, pageSize  },
      queryParamsHandling: 'merge'
    });

  }

  get filteredProducts() {
    return this.productService.productList();
  }

  searchSort(event: any){
    const {orderBy, sortOrder} = event.value;

    this.router.navigate(['products'], {
      queryParams: { orderBy, sortOrder },
      queryParamsHandling: 'merge',
    });


  }

  toggleFilters() {
    this.isFilterOn = !this.isFilterOn;
  }

}
