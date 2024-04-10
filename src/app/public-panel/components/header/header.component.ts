import { Component } from '@angular/core';

@Component({
  selector: 'public-panel-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isSearchOpen: boolean = false;

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  isCartOpen: boolean = false;

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
