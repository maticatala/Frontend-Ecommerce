import { Component, ElementRef, OnInit, ViewChild, computed, effect, inject } from '@angular/core';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';

@Component({
  selector: 'public-panel-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private authService = inject(AuthService);
  private productService = inject(ProductsService);


  @ViewChild('searchInput')
  public tagInput! : ElementRef<HTMLInputElement>;
  public products : Product[] = [];

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

  // searchTag(tag : string){
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.productService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }

  get tags(){
    return this.productService.tagsHistory;
  }

  clickedTag( tag : string ) : void {
    this.productService.searchTag( tag );
  }

}
