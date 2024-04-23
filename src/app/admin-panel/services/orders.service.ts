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

}
