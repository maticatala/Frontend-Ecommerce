import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';
import { ItemMP } from '../interfaces/item-mp.interface';

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService {
  private baseURL =environment.baseUrl;
  private http = inject(HttpClient);

  checkout(body : any) {
    const url = `${this.baseURL}/payments/create-order`;
    // const body = { items };

    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.http.post<{ init_point: string }>(url, body,{headers});
  }
}
