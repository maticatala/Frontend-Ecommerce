import { Component, inject, signal } from '@angular/core';
import { SideBarItems } from '../../interfaces/sidebar-items.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { faUser, faBoxOpen, faCodeBranch, faWaveSquare, faChevronDown, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'admin-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent {

  private authService = inject(AuthService);

  public state = signal<boolean>(false);

  faArrowRightFromBracket = faArrowRightFromBracket;
  faChevronDown = faChevronDown;

  public sidebarItems = signal<SideBarItems[]>([
    {title: 'Inicio', icon: faWaveSquare, route: 'dashboard'},
    {title: 'Usuarios', icon: faUser, route: 'users'},
    {
      title: 'Productos',
      icon: faBoxOpen,
      submenu: true,
      dropState: false,
      submenuItems: [
        { title: 'Lista de productos', route: 'dashboard'},
        { title: 'Añadir producto', route: 'users'}
      ]
    },
    {title: 'Categorias', icon: faCodeBranch, route: 'users'},
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
