import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './admin-layout-page.component.html',
  styleUrls: ['./admin-layout-page.component.css']
})
export class LayoutPageComponent {
  public colapsed = signal<boolean>(false);

  toggle() {
    this.colapsed.set(!this.colapsed());
  }

}
