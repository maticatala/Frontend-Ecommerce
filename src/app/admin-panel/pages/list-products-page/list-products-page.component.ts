import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/app/shared/interfaces';
import { Category } from '../../interfaces/category.interface';
import { Router } from '@angular/router';

import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { Product } from 'src/app/shared/interfaces/product.interface';
@Component({
  templateUrl: './list-products-page.component.html',
  styleUrls: ['./list-products-page.component.css']
})
export class ListProductsPageComponent implements OnInit{

  private productsService = inject(ProductsService);
  private router = inject(Router);
  private _cusSnackbar = inject(CustomSnackbarService);
  private dialog = inject(MatDialog);
  public dataSource = new MatTableDataSource();

  columns: Column[] = [
    {id:'imagen',         label: 'Imagen',      breakpoint: 'static'},
    {id:'name',           label: 'Name',        breakpoint: 'static' },
    {id:'description',    label: 'Description', breakpoint: 'sm' },
    {id:'price',          label: 'Price',       breakpoint: 'sm', pipe: 'currency' },
    {id:'categoriesName', label: 'Categories',  breakpoint: 'md' },
    {id:'createdAt',      label: 'Creado',      breakpoint: 'md', pipe: 'date'},
    {id:'action',         label: 'Acciones',    breakpoint: 'static'}
  ]

  constructor() { };

  ngOnInit(): void {
    this.setProductsList();
  }

  private setProductsList(): void {

    this.productsService.getProducts().subscribe({
      next: () => {
        if (this.productsService.productList()?.length !== 0){
          const rows: any = [];
          this.productsService.productList()!.forEach((element:any,index:number)=> {
            element['recId'] = index +1;
            rows.push(element);

            let catName: string[] = [];

            element.categories.forEach((cat: Category) => {
              catName.push(cat.categoryName);
            })

            element['categoriesName'] = catName.join(', ');

          });

          this.dataSource.data = rows;
        }
      }

    })

  }

  onAddElement(event: any) {
    this.router.navigate(['/dashboard/product']);
  }

  onElementoEditado(product: Product) {
    const productId = product.id;

    this.router.navigate(['/dashboard/product', productId]);
  }

  onElementoEliminado(product: Product) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        type: 'Producto',
        object: product.name,
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (!val) return;

        this.productsService.deleteProduct(product.id).subscribe({
          next: (res) => {
            this.setProductsList();
            this._cusSnackbar.openCustomSnackbar("done", "Delete Successfuly!", "Okay", 3000, 'success');
          },
          error: (e) => {
            let message = e.message;
            if (e.error.message) message = e.error.message

            this._cusSnackbar.openCustomSnackbar("error", message, "Okay", 3000, 'danger');
          }
        });
      }
    })
  }

}
