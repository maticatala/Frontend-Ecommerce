import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'admin-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  @Output() sideNavToggled = new EventEmitter<void>();
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser();

  toggleSidebar(): void {
    this.sideNavToggled.emit();
  }

  Logout(): void {
    this.authService.logout();
  }
}
