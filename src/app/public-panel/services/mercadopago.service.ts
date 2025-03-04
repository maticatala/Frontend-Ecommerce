import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService {
  private baseURL =environment.baseUrl;
  private http = inject(HttpClient);

  checkout(body : any) {
    const url = `${this.baseURL}/payments/create-preference`;

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);


    return this.http.post<{init_point: string}>(url, body,{headers});
  }
}
