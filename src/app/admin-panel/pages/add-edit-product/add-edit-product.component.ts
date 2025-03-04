import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ProductsService } from '../../../shared/services/products.service';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environments';

@Component({
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  isEditing: boolean = false;
  productId: number | null = null;

  //*Image
  file: any;
  imagen: any;

  //*Categories
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  categoriesChips: Category[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  announcer = inject(LiveAnnouncer);
  @ViewChild('categoryInput') categoryInput?: ElementRef<HTMLInputElement>;

  //*injects
  private _cusSnackbar = inject(CustomSnackbarService);
  private categoriesService = inject(CategoriesService);
  private productsService = inject(ProductsService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private readonly baseUrl: string = environment.baseUrl;


  public myForm: FormGroup = this.fb.group({
    image:          [null, [Validators.required]],
    name:           ['', [Validators.required]],
    description:    ['', [Validators.required]],
    price:          ['', [Validators.required]],
    categoriesCtrl: [''],
  });

  ngOnInit(): void {
    this.getCategories();

    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.isEditing = !!this.productId; //porque dos signos de admiracion?
      if (!this.isEditing) return;

      this.productsService.getProductById(this.productId!).subscribe(product => {
        // Llena el formulario con los datos del producto obtenidos
        this.myForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price
        });

        this.myForm.get('image')?.setErrors(null);
        this.myForm.get('image')?.removeValidators;

        this.imagen = `${this.baseUrl}/products/getFile?fileName=${product.imagen}`;
        this.categoriesChips = product.categories;
      });
    });
  }

  getFile(e: any) { //Define una función que recibe un evento e (típicamente del evento change de un input file).
    if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') { //Verifica si el tipo de archivo es PNG o JPEG.
      this.file = e.target.files[0];
      this.imagen = URL.createObjectURL(this.file); //Crea una URL temporal para la imagen cargada.
      this.myForm.get('image')?.setErrors(null); //Limpia los errores del control de formulario.
    } else {
      this.myForm.get('image')?.setErrors({ invalidMimeType: true }) //Si el tipo de archivo no es PNG o JPEG, establece un error en el control de formulario.
    }
  }

  clearFile() {
    this.file = undefined;
    this.imagen = undefined;
    this.myForm.get('image')?.setValue(undefined);
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(res => {
      this.categories = res;
      this.filteredCategories = res;
    })
  }

  onKey(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.filteredCategories = this.search(value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.categories.filter(category => category.categoryName.toLowerCase().includes(filter));
  }

  selected(event: MatAutocompleteSelectedEvent) {

    if (!this.categoriesChips.includes(event.option.value)) { //Verifica si la categoría ya ha sido agregada.

      this.categoriesChips.push(event.option.value); //Agrega la categoría al array categoriesChips.
    }

    this.categoryInput!.nativeElement.value = ''; //Limpia el campo de entrada de categorías.
  }

  remove(categoryChip: Category): void {
    const index = this.categoriesChips.indexOf(categoryChip);

    if (index >= 0) {
      this.categoriesChips.splice(index, 1);

      this.announcer.announce(`Removed ${categoryChip}`);
    }
  }

  onFormSubmit() {
    this.setCategoriesErrors(); // Que hace esto?

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { categoriesCtrl, image, ...data } = this.myForm.value;

    data.categoriesIds = this.categoriesChips.map(category => category.id);

    if (this.isEditing) {
      this.productsService.updateProduct(this.productId!, data, this.file).subscribe({
        next: (res: any) => {
          this.router.navigate(['/dashboard/products']);

          this._cusSnackbar.openCustomSnackbar("done", "Modified Successfuly!", "Okay", 3000, 'success');
        },
        error: (e: any) => {
            let message = e.message;
            if (e.error.message) message = e.error.message

            this._cusSnackbar.openCustomSnackbar("error", message, "Okay", 3000, 'danger');
        }
      });
    } else {
      this.productsService.createProduct(data, this.file).subscribe({
        next: (res: any) => {
          this.resetForm();

          this._cusSnackbar.openCustomSnackbar("done", "Added Successfuly!", "Okay", 3000, 'success');
        },
        error: (e: any) => {
            let message = e.message;
            if (e.error.message) message = e.error.message

            this._cusSnackbar.openCustomSnackbar("error", message, "Okay", 3000, 'danger');
        }
      });
    }
  }

  resetForm() {
    this.myForm.reset();
    this.categoriesChips = [];
    this.clearFile();

    Object.keys(this.myForm.controls).forEach((key) => {
      const control = this.myForm.controls[key];
      control.setErrors(null);
    });
  }

  setCategoriesErrors() {
    const categoriesCtrl = this.myForm.get('categoriesCtrl');

    //REGLA DE NEGOCIO -> LOS PRODUCTOS DEBEN TENER AL MENOS UNA CATEGORIA PARA SER CREADOS
    // if (this.categoriesChips.length === 0) {
    //   categoriesCtrl?.setErrors({ required: true });
    //   return;
    // }

    categoriesCtrl?.setErrors(null);
  }

}
