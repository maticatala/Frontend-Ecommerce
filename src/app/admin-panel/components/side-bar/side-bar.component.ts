import { Component, inject, signal } from '@angular/core';
import { SideBarItems } from '../../interfaces/sidebar-items.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'admin-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent {

  private authService = inject(AuthService);

  public state = signal<boolean>(false);

  public sidebarItems = signal<SideBarItems[]>([
    {title: 'Inicio', icon: 'fa-solid fa-wave-square', route: 'dashboard'},
    {title: 'Usuarios', icon: 'fa-solid fa-user', route: 'users'},
    {
      title: 'Productos',
      icon: 'fa-solid fa-box-open',
      submenu: true,
      dropState: false,
      submenuItems: [
        { title: 'Lista de productos', route: 'dashboard'},
        { title: 'Añadir producto', route: 'users'}
      ]
    },
    {title: 'Categorias', icon: 'fa-solid fa-code-branch', route: 'users'},
  ]);

  get user() {
    return this.authService.currentUser;
  }

  toggleSideBar(): void {
    this.state.set(!this.state());
  }

  onLogout(): void {
    this.authService.logout();
  }

}
