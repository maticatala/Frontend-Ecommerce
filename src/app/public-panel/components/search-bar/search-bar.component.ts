import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
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

    this.router.navigateByUrl(`/products?name=${tag}`);
  }
}
