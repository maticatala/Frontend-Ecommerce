import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'public-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent {

  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    name:     ['', [Validators.required]],
    phone:    ['', [Validators.required]],
    address:  ['', [Validators.required]],
    number:   [''],
    flat:     [''],
    city:     ['', [Validators.required]],
    postCode: ['', [Validators.required]],
    state:    ['', [Validators.required]],
    country:  ['', [Validators.required]],
  });

  onFormSubmit() {

  }
}
