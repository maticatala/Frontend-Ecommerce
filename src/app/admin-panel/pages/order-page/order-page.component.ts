import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../interfaces/order.interface';
import { switchMap } from 'rxjs';
import { User } from 'src/app/auth/interfaces';
import { ShippingAddress } from '../../interfaces/shippingAddress.interface';
import { OrderStatus } from '../../interfaces/order-status.enum';
import { Column } from 'src/app/shared/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {

  private route = inject(ActivatedRoute);
  private ordersService = inject(OrdersService);
  private fb = inject(FormBuilder);

  public order?: Order;
  public customer?: User;
  public shippingAddress?: ShippingAddress;
  public orderStatus = OrderStatus;
  public total: number = 0;

  public dataSource = new MatTableDataSource();
  public columns: Column[] = [
    {id:'imagen',             label: 'Imagen',      breakpoint: 'static'},
    {id:'productName',             label: 'Producto',      breakpoint: 'static'},
    {id:'product_unit_price', label: 'precio unitario', breakpoint: 'sm', pipe: 'currency'},
    {id:'product_quantity', label: 'cantidad', breakpoint: 'sm' },
    {id:'subTotal', label: 'subtotal', breakpoint: 'sm', pipe: 'currency'},
  ]

  ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap(
        ({ id }) => this.ordersService.getOrderById(id)
      )
    )
    .subscribe( order => {
      this.order = order;
      this.customer = order.user;
      this.shippingAddress = order.shippingAddress;

      console.log(this.orderStatus);

      const rows: any = [];

      order.products.forEach((element:any,index:number)=> {
        element['recId'] = index +1;
        element['imagen'] = element.product.imagen
        element['productName'] = element.product.name
        element['subTotal'] = (parseInt(element.product_unit_price)) * parseInt(element.product_quantity);
        this.total += element['subTotal'];
        rows.push(element);
      });


      this.dataSource.data = order.products;
      return
    });

  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  updateOrderStatus() {

    if (!this.order) return;

    if (this.order.status !== OrderStatus.CANCELLED){
      const data = {
        'status': this.order.status
      }
      this.ordersService.updateStatus(this.order.id, data).subscribe({
        next: (res: any) => {
          console.log('Actualizado con exito',res)
        },
        error: (e:any) => {
          console.log(e.error.message);
        }
      })
    } else {
      this.ordersService.cancelOrder(this.order.id).subscribe({
        next: (res: any) => {
          console.log('Cancelado con exito',res)
        },
        error: (e:any) => {
          console.log(e.error.message);
        }
      });
    }

  }


}
