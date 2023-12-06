import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';

@Component({
  templateUrl: './admin-layout-page.component.html',
  styleUrls: ['./admin-layout-page.component.css']
})
export class LayoutPageComponent {

  @ViewChild('snav') sideNav!: MatSidenav;
  @ViewChild(MatSidenavContainer) sidenavContainer!: MatSidenavContainer;

  sideNavMode: 'side' | 'over' = 'side';
  sideNavDefaultOpened = true;
  showFullMenu = true;
  isExpanded = true;
  isMobile!: boolean;
  hasBackdrop: boolean = false;


  constructor() {
    this.checkIsMobile();
    window.addEventListener('resize', () => {
      this.checkIsMobile();
    });
  }

  closeInSm() {
    if (window.innerWidth < 768) this.sideNav.close();
  }

  checkIsMobile() {
    if (window.innerWidth < 768) {
      if (this.sideNavDefaultOpened) {
          // close side nav in mobile view
          this.sideNavDefaultOpened = false;
          this.isExpanded = true;
        }
        this.isMobile = true;
        this.showFullMenu = true;
        this.sideNavMode = 'over';
        this.hasBackdrop = true;
    } else {
        this.isMobile = false;
        // open side nav
        this.sideNavDefaultOpened = true;
        this.sideNavMode = 'side';
        this.hasBackdrop = false;
    }

  }


  onToolbarMenuToggle() {
    if (this.isMobile) {
        this.sideNav.toggle();
    } else {
      if (!this.isExpanded) {
        this.showFullMenu = true;
      } else {
        this.showFullMenu = false;
      }
      this.isExpanded = !this.isExpanded;
    }
  }

}
