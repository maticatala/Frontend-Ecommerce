import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { Order } from '../interfaces/order.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() { }

  getOrders(): Observable<Order[]> {

    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<Order[]>(`${this.baseUrl}/orders`, {headers});
  }

  getOrderById(id: number): Observable<Order> {

    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<Order>(`${this.baseUrl}/orders/${id}`, {headers});

  }

  cancelOrder(id: number): Observable<Order> {

    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.http.put<Order>(`${this.baseUrl}/orders/cancel/${id}`, null, {headers})

  }

  //! La data tiene que tener el formato status: orderStatus en una interface
  updateStatus(id:number, data: any): Observable<Order> {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    });

    console.log(data);

    return this.http.put<Order>(`${this.baseUrl}/orders/${id}`, data, {headers})
  }

}
