import { Component, inject } from '@angular/core';
import { OrdersService } from '../../../shared/services/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/app/shared/interfaces';
import { Order } from '../../interfaces/order.interface';
import { Router } from '@angular/router';

@Component({
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent {
  private ordesrsService = inject(OrdersService);
  private router = inject(Router);
  // private _cusSnackbar = inject(CustomSnackbarService);
  // private dialog = inject(MatDialog);
  public dataSource = new MatTableDataSource();

  columns: Column[] = [
    {id:'id',         label: 'Numero',     breakpoint: 'static'},
    {id:'userEmail',  label: 'Cliente',    breakpoint: 'md'},
    {id:'orderAt',    label: 'Pedido el',  breakpoint: 'md', pipe: 'date'},
    {id:'status',     label: 'Estado',     breakpoint: 'static' },
    {id:'more',       label: 'Ver mas',    breakpoint: 'static' },
  ]

  ngOnInit(): void {
    this.setOrdersList();
  }

  private setOrdersList(): void {
    this.ordesrsService.getOrders().subscribe( result => {

      if(result.length > 0){
        const rows: any = [];

        result.forEach((element:any,index:number)=> {
          element['recId'] = index +1;
          element['userEmail'] = element.user.email;
          rows.unshift(element);
        });

        this.dataSource.data = rows;
      } else {
        this.dataSource.data = [];
      }
    })
  }

  onVerMas(order: Order){
    const { id } = order

    this.router.navigate(['/dashboard/order', id]);
  }

}
