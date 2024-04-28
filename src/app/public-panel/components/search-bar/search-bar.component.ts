import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'public-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnChanges {

  @Input() isExpanded: boolean = false;
  @Output() closeEvent = new EventEmitter<boolean>();
  @ViewChild('searchInput') searchInput!: ElementRef;

  close() {
    this.isExpanded = false;
    this.closeEvent.emit(this.isExpanded);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isExpanded']){
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 150);;
    }
  }
}
