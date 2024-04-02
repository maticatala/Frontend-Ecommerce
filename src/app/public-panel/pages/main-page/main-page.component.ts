import { Component } from '@angular/core';

@Component({
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  images = [
    {
      imageSrc: './../../../../assets/Carrusel/Slide2.webp',
      imageAlt: '3Dprinting 2',
    },
    {
      imageSrc: './../../../../assets/Carrusel/333.webp',
      imageAlt: '3Dprinting 1',
    },
    {
      imageSrc: './../../../../assets/Carrusel/3d-printing-1-1.jpg',
      imageAlt: '3Dprinting 2',
    },
  ]

}
