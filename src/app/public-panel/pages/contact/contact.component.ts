import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'public-panel-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      descripcion: ['', Validators.required]
    });
  }

  onSubmit() {
    const nombreValue: string = this.myForm.get('nombre')?.value.trim();
    const correoValue: string = this.myForm.get('correo')?.value.trim();
    const descripcionValue: string = this.myForm.get('descripcion')?.value.trim();

    const errorMessageElement = document.getElementById('errorMessage');

    if (nombreValue === '' || correoValue === '' || descripcionValue === '') {
      if (errorMessageElement) errorMessageElement.classList.remove('hidden');
    } else {
      if (errorMessageElement) errorMessageElement.classList.add('hidden');
      // Aquí puedes enviar el formulario si todos los campos están llenos
      console.log("Formulario enviado");
    }
  }


}
