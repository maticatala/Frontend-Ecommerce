import { Component, inject, signal } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  host: {'some-binding': 'some-value'},
})
export class DashboardPageComponent {

  private authService = inject(AuthService)


  constructor() { }

}
