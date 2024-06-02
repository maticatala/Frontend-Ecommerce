import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  scrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollHeight = 200; // Altura a la que se aplica el background-color, ajusta según tus necesidades
    this.scrolled = window.scrollY >= scrollHeight;
  }


}
