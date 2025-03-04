import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { Order } from '../../admin-panel/interfaces/order.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() { }

  createOrder(body: any): Observable<Order> {

    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<any>(`${this.baseUrl}/orders`, body, {headers});
  }

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

  getUserOrderById(id: number): Observable<Order> {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<Order>(`${this.baseUrl}/orders/userOrder/${id}`, {headers});
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

    return this.http.put<Order>(`${this.baseUrl}/orders/${id}`, data, {headers})
  }

  updatePaymentStatus(id:number, data:any): Observable<Order> {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put<Order>(`${this.baseUrl}/orders/payments/${id}`, data, {headers})
  }

  getUserOrders(): Observable<Order[]> {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    });

    // return this.http.put<Order>(`${this.baseUrl}/orders/payments/${id}`, data, {headers})
    return this.http.get<Order[]>(`${this.baseUrl}/orders/userOrders`, {headers});
  }

  getLastOrderId(): Observable<{id: String}> {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<{id: string}>(`${this.baseUrl}/orders/last-order`, {headers});
  }


  deleteOrder(orderId: number) {
    const url = `${this.baseUrl}/orders/${orderId}`;
    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(url, { headers });
  }

}
