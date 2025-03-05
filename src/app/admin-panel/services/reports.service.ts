import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData, SalesSummary } from '../interfaces/reports.interface';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private baseUrl = `${environment.baseUrl}/reports`;

  constructor(private http: HttpClient) {}

  //A traves de este endpoint traemos toda la data del dashboard.
  getDashboardData(
    period: 'monthly' | 'annual' | 'historical' = 'historical',
    year?: number,
    month?: number
  ): Observable<DashboardData> {
    let params = new HttpParams().set('period', period);

    if (year) {
      params = params.set('year', year.toString());
    }

    if (month && period === 'monthly') {
      params = params.set('month', month.toString());
    }

    return this.http.get<DashboardData>(`${this.baseUrl}/dashboard`, { params });
  }

  //Con este endpoint traemos el resumen de ventas cuando se cambia el periodo
  getSalesSummary(
    period: 'monthly' | 'annual' | 'historical' = 'monthly',
    year?: number,
    month?: number
  ): Observable<SalesSummary> {
    let params = new HttpParams().set('period', period);

    if (year) {
      params = params.set('year', year.toString());
    }

    if (month && period === 'monthly') {
      params = params.set('month', month.toString());
    }

    return this.http.get<SalesSummary>(`${this.baseUrl}/sales-summary`, { params });
  }


  //* No hace falta implementar estos metodos ya que no se utilizan en el front
  // getOrdersStatus(): Observable<OrdersStatus> {
  //   return this.http.get<OrdersStatus>(`${this.baseUrl}/orders-status`);
  // }

  // getTopProducts(limit: number = 10): Observable<TopProduct[]> {
  //   return this.http.get<TopProduct[]>(`${this.baseUrl}/top-products`, {
  //     params: { limit: limit.toString() }
  //   });
  // }

  // getPopularCategories(limit: number = 5): Observable<PopularCategory[]> {
  //   return this.http.get<PopularCategory[]>(`${this.baseUrl}/popular-categories`, {
  //     params: { limit: limit.toString() }
  //   });
  // }
}
