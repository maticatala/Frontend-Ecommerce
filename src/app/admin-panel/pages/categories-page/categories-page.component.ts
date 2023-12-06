import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { MatTableDataSource } from '@angular/material/table';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';
import { Column } from 'src/app/shared/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../interfaces/category.interface';
import { CategoryAddEditComponent } from '../../components/category-add-edit/category-add-edit.component';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';

@Component({
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent {
  private categoriesService = inject(CategoriesService)
  private _cusSnackbar = inject(CustomSnackbarService);
  public dataSource = new MatTableDataSource();

  columns: Column[] = [
    {id:'id',            label:'ID',       breakpoint: 'static'},
    {id: 'categoryName', label: 'Name',    breakpoint: 'static' },
    {id:'action',        label:'Acciones', breakpoint: 'static'}
  ]

  constructor(private dialog: MatDialog){}

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

  onElementoEditado(category: Category) {
    const dialogRef = this.dialog.open(CategoryAddEditComponent, {
      data: category,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) this.setCategoriesList();
      }
    })
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

  onAddElement(event: any) {
    const dialogRef = this.dialog.open(CategoryAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) this.setCategoriesList();
      }
    })
  }
}
