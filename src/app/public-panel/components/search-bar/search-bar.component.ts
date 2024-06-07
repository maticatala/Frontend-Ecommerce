import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'public-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  private productService = inject(ProductsService);
  private router = inject(Router);
  public isExpanded: boolean = false;
  @ViewChild('searchInput') searchInput!: ElementRef;

  toggleSearch() {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded){
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 100);
    }
  }

  searchTag(event: any) {
    this.toggleSearch();

    const newTag = event.target.value;

    //Validamos que newTag contenga algun valor
    if ( newTag.length === 0 ) return;

    this.router.navigate(['products'], {
      queryParams: { name: newTag },
      queryParamsHandling: 'merge'
    });


    event.target.value = '';
  }

  get tags(){
    return this.productService.tagsHistory;
  }

  clickedTag( tag : string ) : void {

    this.toggleSearch();

    this.router.navigate(['products'], {
      queryParams: { name: tag },
      queryParamsHandling: 'merge'
    });
  }
}
