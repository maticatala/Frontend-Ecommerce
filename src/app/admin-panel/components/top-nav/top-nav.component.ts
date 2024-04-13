import { Component, EventEmitter, Output, computed, effect, inject } from '@angular/core';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'admin-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  @Output() sideNavToggled = new EventEmitter<void>();
  private authService = inject(AuthService);

  currentUser?: User | null;

  public finishedUserCheck = computed<boolean>(() => {

    if (this.authService.currentUser()) {
      return true;
    }

    return false;
  });

  public currentUserChangeEffect = effect (()=>{

    this.currentUser = this.authService.currentUser();

  })

  toggleSidebar(): void {
    this.sideNavToggled.emit();
  }

  Logout(): void {
    this.authService.logout();
  }
}
