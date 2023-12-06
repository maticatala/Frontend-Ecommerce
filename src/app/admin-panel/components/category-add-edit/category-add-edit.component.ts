import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.css']
})
export class CategoryAddEditComponent {
  private fb = inject(FormBuilder);
  private _dialogRef = inject(MatDialogRef<CategoryAddEditComponent>);
  private _cusSnackbar = inject(CustomSnackbarService);
  private categoriesService = inject(CategoriesService);

  public data = inject(MAT_DIALOG_DATA);
  public hide = true;

  public myForm: FormGroup = this.fb.group({
    categoryName: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.myForm.patchValue(this.data);
  }

  onFormSubmit(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    };

    if (this.data) {
      this.updateCategory(this.data.id, this.myForm.value);
    } else {
      this.createCategory(this.myForm.value);
    }
  }

  private updateCategory(id:number, body:any): void {
    this.categoriesService.updateCategory(id, body).subscribe({
        next: (res: any) => {
          this._cusSnackbar.openCustomSnackbar("done", "Category Modified Succesfully!", "Okay", 3000, 'success');
          this._dialogRef.close(true);//Permite recargar la lista de categorias una vez actualizada una categoria
        },
        error: (e: any) => {
          console.log(e.error.message);
          this._cusSnackbar.openCustomSnackbar("error", e.error.message, "Okay", 3000, 'danger');
        }
      })
  }

  private createCategory(body:any): void {
    this.categoriesService.createCategory(body).subscribe({
        next: (res: any) => {
          this._cusSnackbar.openCustomSnackbar("done", "Category Added Succesfully!", "Okay", 3000, 'success');
          this._dialogRef.close(true); //Permite recargar la lista de categorias una vez creada una categoria
        },
        error: (e: any) => {
          console.log(e.error.message);
          this._cusSnackbar.openCustomSnackbar("error", e.error.message, "Okay", 3000, 'danger');
        }
      })
  }
}
