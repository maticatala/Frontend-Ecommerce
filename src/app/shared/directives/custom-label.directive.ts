import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'rgb(248 113 113)' ;
  private _errors?: ValidationErrors | null;
  private _isTouched?: boolean;

  @Input()
  set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input()
  set isTouched(value: boolean | undefined) {
    this._isTouched = value;
    if (this._isTouched && this._errors) this.setErrorMessage();
  }

  @Input()
  set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    if (this._isTouched) this.setErrorMessage();
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement.nativeElement.style.color = this._color;
    // this.htmlElement.nativeElement.classList.add('invisible');
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;

    const element = this.htmlElement.nativeElement;

    if (!this._errors) {
      element.classList.add('hidden');
      return;
    }

    element.classList.remove('hidden');

    const errors = Object.keys(this._errors);

    if (errors.includes('emailTaken')) {
      element.innerHTML = 'Ya existe una cuenta con este correo electronico';
      return;
    }

    if (errors.includes('notEqual')) {
      element.innerHTML = 'Las contraseñas deben ser iguales';
      return;
    }

    if (errors.includes('invalidMimeType')) {
      element.innerHTML = 'El formato de imagen debe ser png o jpeg';
      return;
    }

    if (errors.includes('required')) {
      element.innerHTML = 'Este campo es requerido';
      return;
    }

    if (errors.includes('minlength')) {
      const minlength = this._errors['minlength'];

      element.innerHTML = `El minimo de caracteres es ${minlength.requiredLength} y llevas ${minlength.actualLength}`;
      return;
    }

    if (this._errors['pattern']['requiredPattern'].toString() === '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') {
      element.innerHTML = `Email invalido`;
      return;
    }

  }

}
