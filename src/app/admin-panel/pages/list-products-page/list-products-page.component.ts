import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/app/shared/interfaces';
import { Category } from '../../interfaces/category.interface';

@Component({
  templateUrl: './list-products-page.component.html',
  styleUrls: ['./list-products-page.component.css']
})
export class ListProductsPageComponent implements OnInit{


  private productsService = inject(ProductsService);
  // private _cusSnackbar = inject(CustomSnackbarService);
  public dataSource = new MatTableDataSource();

  columns: Column[] = [
    {id:'imagen',        label: 'Imagen',  breakpoint: 'static' },
    {id:'name',        label: 'Name',  breakpoint: 'static' },
    {id:'description',        label: 'Description',  breakpoint: 'sm' },
    {id:'categoriesName',        label: 'Categories',  breakpoint: 'md' },
    {id:'action',        label:'Acciones', breakpoint: 'static'}
  ]

  ngOnInit(): void {
    this.setProductsList();
  }

  private setProductsList(): void {
    this.productsService.getProducts().subscribe( result => {

      if(result.length > 0){
        const rows: any = [];

        result.forEach((element:any,index:number)=> {
          element['recId'] = index +1;
          rows.push(element);


          let catName: string[] = [];

          element.categories.forEach((cat: Category) => {
            catName.push(cat.categoryName);
          })

          element['categoriesName'] = catName.join(', ');

          console.log(element['categoriesName']);
        });

        this.dataSource.data = rows;
      }
    })
  }

}
