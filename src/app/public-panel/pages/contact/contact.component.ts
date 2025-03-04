import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';
import { EmailResponse } from '../../interfaces/contact-form.interface';

@Component({
  selector: 'public-panel-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  private contactService = inject(ContactService);
  private _cusSnackbar = inject(CustomSnackbarService);
  private fb = inject(FormBuilder);

  public loading = false;
  public submitSuccess = false;
  public submitError = false;
  public errorMessage = '';

  public myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });


  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.submitSuccess = false;
    this.submitError = false;

    const formData = {
      name: this.myForm.get('name')?.value.trim(),
      email: this.myForm.get('email')?.value.trim(),
      subject: this.myForm.get('subject')?.value.trim(),
      message: this.myForm.get('message')?.value.trim()
    };

    this.contactService.sendContactForm(formData).subscribe({
      next: (response: EmailResponse) => {
        this.loading = false;
        this.submitSuccess = true;
        this.myForm.reset();
        console.log('Mensaje enviado con éxito', response);
        this._cusSnackbar.openCustomSnackbar("done", "Mensaje enviado", "Ok", 3000, 'success');
      },
      error: (e) => {
        this.loading = false;
        this.errorMessage = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
        console.error('Error al enviar el mensaje', e);
        this._cusSnackbar.openCustomSnackbar("error", this.errorMessage, "Ok", 3000, 'danger');
      }
    });
  }


}
