import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'public-panel-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private authService = inject(AuthService);

  constructor(private elementRef: ElementRef) {}

  get currentUser() {
    return this.authService.currentUser();
  }

  Logout(): void {
    this.authService.logout();
  }

  isCartOpen: boolean = false;

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }


  //Sidebar

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.getElementById('sidebar')?.classList.toggle('active');
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target) && this.isMenuOpen) {
      // El clic fue fuera del nav, aquí puedes realizar la acción que desees
      this.toggleMenu()
    }
  }

}
