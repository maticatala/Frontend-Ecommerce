import { Component, inject } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/app/shared/interfaces';

@Component({
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent {
  private ordesrsService = inject(OrdersService);
  // private router = inject(Router);
  // private _cusSnackbar = inject(CustomSnackbarService);
  // private dialog = inject(MatDialog);
  public dataSource = new MatTableDataSource();

  columns: Column[] = [
    {id:'id',         label: 'Numero',      breakpoint: 'static'},
    {id:'user',       label: 'Cliente',        breakpoint: 'static', pipe: 'userEmail'},
    {id:'status',     label: 'Estado', breakpoint: 'static' },
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
          rows.push(element);
        });

        this.dataSource.data = rows;
      } else {
        this.dataSource.data = [];
      }
    })
  }

}
