import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData, SalesSummary, OrdersStatus, TopProduct, PopularCategory } from '../interfaces/reports.interface';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private baseUrl = `${environment.baseUrl}/reports`;

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.baseUrl}/dashboard`);
  }

  getSalesSummary(period: 'monthly' | 'annual' = 'monthly'): Observable<SalesSummary> {
    return this.http.get<SalesSummary>(`${this.baseUrl}/sales-summary`, {
      params: { period }
    });
  }

  getOrdersStatus(): Observable<OrdersStatus> {
    return this.http.get<OrdersStatus>(`${this.baseUrl}/orders-status`);
  }

  getTopProducts(limit: number = 10): Observable<TopProduct[]> {
    return this.http.get<TopProduct[]>(`${this.baseUrl}/top-products`, {
      params: { limit: limit.toString() }
    });
  }

  getPopularCategories(limit: number = 5): Observable<PopularCategory[]> {
    return this.http.get<PopularCategory[]>(`${this.baseUrl}/popular-categories`, {
      params: { limit: limit.toString() }
    });
  }
}
