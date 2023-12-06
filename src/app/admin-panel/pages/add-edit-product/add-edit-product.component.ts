import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category.interface';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  //*Image
  file: any;
  imagen: any;

  //*Categories
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  categoriesChips: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  announcer = inject(LiveAnnouncer);
  @ViewChild('categoryInput') categoryInput?: ElementRef<HTMLInputElement>;

  //*injects
  private categoriesService = inject(CategoriesService);
  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    image: [null, [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    categoriesCtrl: [''],
  });

  ngOnInit(): void {
    this.getCategories();
  }

  getFile(e: any) {
    if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
      this.file = e.target.files[0];
      this.imagen = URL.createObjectURL(this.file);
      this.myForm.get('image')?.setErrors(null);
    } else {
      this.myForm.get('image')?.setErrors({ invalidMimeType: true })
    }
  }

  clearFile() {
    this.file = undefined;
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

    if (!this.notRepeatCategory(event.option.viewValue)) this.categoriesChips.push(event.option.viewValue);

    this.categoryInput!.nativeElement.value = '';
  }

  notRepeatCategory(value: string) {
    let exists = false;
    this.categoriesChips.forEach(cat => {
      if (cat === value) exists = true;
    })
    return exists;
  }

  remove(categoryChip: string): void {
    const index = this.categoriesChips.indexOf(categoryChip);

    if (index >= 0) {
      this.categoriesChips.splice(index, 1);

      this.announcer.announce(`Removed ${categoryChip}`);
    }
  }

  onFormSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    let formData = new FormData();
    formData.set("file", this.file);
  }

}
