import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../shared/services/orders.service';
import { Order, Payment } from '../../interfaces/order.interface';
import { switchMap } from 'rxjs';
import { User } from 'src/app/auth/interfaces';
import { ShippingAddress } from '../../interfaces/shippingAddress.interface';
import { Column } from 'src/app/shared/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDetailsDialogComponent } from '../../components/payment-details-dialog/payment-details-dialog.component';
import { OrderStatus } from '../../enums/order-status.enum';

@Component({
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {

  private route = inject(ActivatedRoute);
  private ordersService = inject(OrdersService);
  private _cusSnackbar = inject(CustomSnackbarService);
  private dialog = inject(MatDialog);

  public order?: Order;
  public customer?: User;
  public shippingAddress?: ShippingAddress;
  public orderStatus = OrderStatus;
  public status?: string;
  public total: number = 0;

  public dataSource = new MatTableDataSource();
  public dataPaymentsSource = new MatTableDataSource();

  public columns: Column[] = [
    {id:'imagen',             label: 'Imagen',          breakpoint: 'static'                  },
    {id:'productName',        label: 'Producto',        breakpoint: 'static'                  },
    {id:'product_unit_price', label: 'precio unitario', breakpoint: 'md',     pipe: 'currency'},
    {id:'product_quantity',   label: 'cantidad',        breakpoint: 'md'                      },
    {id:'subTotal',           label: 'subtotal',        breakpoint: 'md',     pipe: 'currency'},
  ]

  public paymentsColumns: Column[] = [
    {id:'paymentType',        label: 'Tipo de Pago',    breakpoint: 'static'                  },
    {id:'status',             label: 'Estado',          breakpoint: 'sm'                      },
    {id:'amount',             label: 'Cantidad',        breakpoint: 'md', pipe: 'currency'    },
    {id:'more',               label: 'Ver',             breakpoint: 'static'                  },
  ]

  constructor(){}

  ngOnInit(): void {
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    this.route.params
    .pipe(
      switchMap(
        ({ id }) => this.ordersService.getOrderById(id)
      )
    )
    .subscribe( order => {
      this.order = order;
      this.total = 0;
      this.customer = order.user;
      this.shippingAddress = order.shippingAddress;
      this.status = order.status;

      order.products.forEach((element:any,index:number)=> {
        element['recId'] = index +1;
        element['imagen'] = element.product.imagen
        element['productName'] = element.product.name
        element['subTotal'] = (parseInt(element.product_unit_price)) * parseInt(element.product_quantity);
        this.total += element['subTotal'];
      });

      this.dataSource.data = order.products;
      this.dataPaymentsSource.data = order.payments;
      return
    });
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  updateOrderStatus() {
    if (!this.order) return;

    const updateFunction = this.status !== OrderStatus.CANCELLED ?
      this.ordersService.updateStatus.bind(this.ordersService, this.order.id, { status: this.status }) :
      this.ordersService.cancelOrder.bind(this.ordersService, this.order.id);

    updateFunction().subscribe({
      next: (order: Order) => {
        this.order = order;
        this._cusSnackbar.openCustomSnackbar("done", `${this.status} Successfuly!`, "Okay", 3000, 'success');
      },
      error: (e: any) => {
        const message = e.error.message;
        this._cusSnackbar.openCustomSnackbar("error", message, "Okay", 3000, 'danger');
      }
    });
  }

  openPaymentDetaildDialog(payment: Payment): void {
    const dialogRef = this.dialog.open(PaymentDetailsDialogComponent, {
      data: payment
    });

    dialogRef.afterClosed().subscribe(
      () => {
        this.loadOrderDetails();
      }
    )
  }


}
