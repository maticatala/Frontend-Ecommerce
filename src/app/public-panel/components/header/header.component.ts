import { Component, ElementRef, HostListener, OnInit, computed, effect, inject } from '@angular/core';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'public-panel-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private authService = inject(AuthService);
  public isSearchOpen: boolean = false;

  constructor() {}

  get currentUser() {
    return this.authService.currentUser();
  }

  Logout(): void {
    this.authService.logout();
  }

  // search
  toggleSearch() {
    this.isSearchOpen = true;
  }

  receiveEvent($event:boolean){
    this.isSearchOpen = $event;
  }
  //

  isCartOpen: boolean = false;

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // prevScrollpos = window.pageYOffset;
  // visible = true;

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll() {
  //   const currentScrollPos = window.pageYOffset;
  //   if (this.prevScrollpos > currentScrollPos) {
  //     this.visible = true; // Desplazamiento hacia arriba, muestra el encabezado
  //   } else {
  //     this.visible = false; // Desplazamiento hacia abajo, oculta el encabezado
  //   }
  //   this.prevScrollpos = currentScrollPos;
  // }

  searchActive: boolean = false;

  // togglePageScroll() {
  //   if (!this.searchActive) {
  //     // Deshabilita temporalmente el desplazamiento de la página
  //     document.body.style.overflow = 'hidden';
  //     this.searchActive = true;
  //   } else {
  //     // Activa el desplazamiento de la página
  //     document.body.style.overflow = '';
  //     this.searchActive = false;
  //   }
  // }

}
