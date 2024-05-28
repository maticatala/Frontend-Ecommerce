import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'public-panel-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {

  showButton: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Mostrar el botón después de hacer un poco de scroll (por ejemplo, 100px)
    this.showButton = scrollTop > 100;
  }

  goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
