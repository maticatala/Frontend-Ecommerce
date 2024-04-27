import { Component } from '@angular/core';

@Component({
  selector: 'public-panel-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  constructor(){}

  ngOnInit():void {
    this.CartDetails();
  }

  getCartDetails:any[]=[];
  CartDetails(){
    this.getCartDetails = []; // Inicializa como un array vacío antes de usarlo
    const cartData = localStorage.getItem('localCart');
    if(cartData) { // Verifica si hay datos en el localStorage
      this.getCartDetails = JSON.parse(cartData);
    }
  }
  eliminarFila(index: number): void {
    this.getCartDetails.splice(index, 1);
  }

}
