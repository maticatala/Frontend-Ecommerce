import { Component, OnDestroy, OnInit, computed, effect, inject } from '@angular/core';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'public-panel-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

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

  cartItem: number = 0;

  constructor(private auth: AuthService) {
    this.auth.cartSubject.subscribe((data)=>{
      this.cartItem = data;
    })
  }

  ngOnInit(): void {
    this.cartItemFunc();
    window.addEventListener('storage', this.handleStorageChange);
    this.CartDetails();
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.handleStorageChange);
  }

  handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'localCart') {
      this.cartItemFunc();
    }
  }

  cartItemFunc() {
    const cartData = localStorage.getItem('localCart');
    if (cartData !== null) {
      const cartItems = JSON.parse(cartData);
      this.cartItem = cartItems.length;
    }
  }


  getCartDetails:any[]=[];
  CartDetails(){
    this.getCartDetails = []; // Inicializa como un array vacío antes de usarlo
    const cartData = localStorage.getItem('localCart');
    if(cartData) { // Verifica si hay datos en el localStorage
      this.getCartDetails = JSON.parse(cartData);
    }
  }

  eliminarFila(index: number): void {
    this.getCartDetails.splice(index, 1);
  }
}
