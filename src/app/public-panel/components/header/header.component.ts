import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'public-panel-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private authService = inject(AuthService);

  currentUser?: User | null;

  isSearchOpen: boolean = false;

  public finishedUserCheck = computed<boolean>(() => {

    if (this.authService.currentUser()) {
      return true;
    }

    return false;
  });

  public currentUserChangeEffect = effect (()=>{

    this.currentUser = this.authService.currentUser();

  })

  Logout(): void {
    this.authService.logout();
  }

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
