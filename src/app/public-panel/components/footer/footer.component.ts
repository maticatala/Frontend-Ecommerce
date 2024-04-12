import { Component } from '@angular/core';

@Component({
  selector: 'public-panel-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {

  openWhatsApp() {
    // Número de teléfono al que se enviará el mensaje de WhatsApp
    const phoneNumber = '';

    // Mensaje predeterminado que se enviará
    const message = 'Hola, ¿cómo puedo ayudarte?';

    // Crear el enlace de WhatsApp con el número de teléfono y el mensaje prefijados
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Abrir la ventana de WhatsApp
    window.open(whatsappLink, '_blank');
  }

}
