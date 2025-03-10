import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { MatTableDataSource } from '@angular/material/table';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';
import { Column } from 'src/app/shared/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../interfaces/category.interface';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { Router } from '@angular/router';

@Component({
  templateUrl: './list-categories-page.component.html',
  styleUrls: ['./list-categories-page.css']
})
export class ListCategoriesPageComponent {
  private categoriesService = inject(CategoriesService)
  private _cusSnackbar = inject(CustomSnackbarService);
  public dataSource = new MatTableDataSource();
  private dialog = inject(MatDialog);
  private router = inject(Router);

  columns: Column[] = [
    {id:'imagen',         label: 'Imagen',      breakpoint: 'static'},
    {id: 'id',            label:'ID',       breakpoint: 'static'},
    {id: 'categoryName',  label: 'Name',    breakpoint: 'static'},
    {id:'description',    label: 'Descripción', breakpoint: 'sm' },
    {id: 'action',        label:'Acciones', breakpoint: 'static'}
  ]

  constructor(){}

  ngOnInit(){
    this.setCategoriesList();
  }

  private setCategoriesList(): void {
    this.categoriesService.getCategories().subscribe( result => {

      if(result.length > 0){
        const rows: any = [];

        result.forEach((element:any,index:number)=> {
          element['recId'] = index +1;
          rows.push(element)
        });

        this.dataSource.data = rows;
      }
    })
  }

  onAddElement(event: any) {
    this.router.navigate(['/dashboard/category']);
  }

  onElementoEditado(category: Category) {
    const categoryId = category.id;

    this.router.navigate(['/dashboard/category', categoryId]);
  }


  onElementoEliminado(category: Category) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        type: 'Categoria',
        object: category.categoryName,
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (!val) return;

        this.categoriesService.deleteCategory(category.id).subscribe({
          next: (res) => {
            this.setCategoriesList();
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
