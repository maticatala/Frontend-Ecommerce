import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';
import { CategoriesService } from '../../services/categories.service';
import { environment } from 'src/app/environments/environments';

@Component({
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {
  isEditing: boolean = false;
  categoryId: number | null = null;

  //*Image
  file: any;
  imagen: any;

  //*Injects
  private _cusSnackbar = inject(CustomSnackbarService);
  private categoriesService = inject(CategoriesService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private readonly baseUrl: string = environment.baseUrl;

  public categoryForm: FormGroup = this.fb.group({
    image: [null, [Validators.required]],
    categoryName: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      this.isEditing = !!this.categoryId;
      if (!this.isEditing) return;

      this.categoriesService.getCategoryById(this.categoryId!).subscribe(category => {
        // Llena el formulario con los datos de la categoría obtenidos
        this.categoryForm.patchValue({
          categoryName: category.categoryName,
          description: category.description
        });

        this.categoryForm.get('image')?.setErrors(null);
        this.categoryForm.get('image')?.removeValidators(Validators.required);

        if (category.imagen) {
          this.imagen = `${this.baseUrl}/categories/file/get?fileName=${category.imagen}`;
        }
      });
    });
  }

  getFile(e: any) {
    if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
      this.file = e.target.files[0];
      this.imagen = URL.createObjectURL(this.file);
      this.categoryForm.get('image')?.setErrors(null);
    } else {
      this.categoryForm.get('image')?.setErrors({ invalidMimeType: true })
    }
  }

  clearFile() {
    this.file = undefined;
    this.imagen = undefined;
    this.categoryForm.get('image')?.setValue(undefined);
  }

  onFormSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const { image, ...data } = this.categoryForm.value;

    if (this.isEditing) {
      this.categoriesService.updateCategory(this.categoryId!, data, this.file).subscribe({
        next: (res: any) => {
          this.router.navigate(['/dashboard/categories']);
          this._cusSnackbar.openCustomSnackbar("done", "Categoría modificada exitosamente!", "Okay", 3000, 'success');
        },
        error: (e: any) => {
          let message = e.message;
          if (e.error.message) message = e.error.message;
          this._cusSnackbar.openCustomSnackbar("error", message, "Okay", 3000, 'danger');
        }
      });
    } else {
      this.categoriesService.createCategory(data, this.file).subscribe({
        next: (res: any) => {
          this.resetForm();
          this._cusSnackbar.openCustomSnackbar("done", "Categoría añadida exitosamente!", "Okay", 3000, 'success');
        },
        error: (e: any) => {
          let message = e.message;
          if (e.error.message) message = e.error.message;
          this._cusSnackbar.openCustomSnackbar("error", message, "Okay", 3000, 'danger');
        }
      });
    }
  }

  resetForm() {
    this.categoryForm.reset();
    this.clearFile();

    Object.keys(this.categoryForm.controls).forEach((key) => {
      const control = this.categoryForm.controls[key];
      control.setErrors(null);
    });
  }
}
