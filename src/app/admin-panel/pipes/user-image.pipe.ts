import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userImage'
})
export class UserImagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    //TODO: Agregar alt_img como atributo de los usuarios administradores
    return 'assets/images/no-image.png';
  }

}
