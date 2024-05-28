import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environments';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  public readonly baseUrl : string = environment.baseUrl;
  public product?: Product;

  public amount: number = 1;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];

      this.productsService.getProductById(productId).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (error) => {
          console.log(error)
        }
      })

    });
  }

  changeQuantity(quantity: number) {
    if (this.amount + quantity > 0 ) this.amount += quantity;
  }

  addCart() {
    if (this.product){
      const cartItem = {
        product: this.product,
        quantity: this.amount
      }

      this.cartService.addProduct(cartItem, true);
    }

  }

  goBack() {
    // Obtener la URL de la página anterior
    const previousUrl = document.referrer;
    // Obtener la URL actual
    const currentUrl = window.location.href;

    // Verificar si la URL de la página anterior contiene el mismo dominio que la actual
    if (previousUrl.includes(window.location.origin)) {
      // Si la URL de la página anterior tiene el mismo dominio, volver a ella
      window.history.back();
    } else {
      // Si la URL de la página anterior no tiene el mismo dominio, redirigir a una página predefinida
      window.location.href = '/products'; // Reemplaza 'paginaPredefinida.html' con la URL de tu página por defecto
    }
  }

  zoomIn(event:any) {
    const x = event.layerX;
    const y = event.layerY;
    event.target.style.transformOrigin = `${x}px ${y}px`
    event.target.style.transform = 'scale(2)'
  }

  zoomOut(event: any) {
    event.target.style.transformOrigin = "center"
    event.target.style.transform = 'scale(1)'
  }

}
