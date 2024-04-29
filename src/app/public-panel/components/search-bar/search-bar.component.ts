import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'public-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnChanges {

  private productService = inject(ProductsService);
  private router = inject(Router);
  @Input() isExpanded: boolean = false;
  @Output() closeEvent = new EventEmitter<boolean>();
  @ViewChild('searchInput') searchInput!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isExpanded']){
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 150);;
    }
  }

  close() {
    this.isExpanded = false;
    this.closeEvent.emit(this.isExpanded);
  }

  searchTag(event: any) {
    this.close();

    const newTag = event.target.value;

    //Validamos que newTag contenga algun valor
    if ( newTag.length === 0 ) return;

    this.router.navigateByUrl(`/products?name=${newTag}`);

    event.target.value = '';
  }

  get tags(){
    return this.productService.tagsHistory;
  }

  clickedTag( tag : string ) : void {

    this.close();

    this.router.navigateByUrl(`/products?name=${tag}`);
  }
}
