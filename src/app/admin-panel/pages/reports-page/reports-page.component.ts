import { Component, inject, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { DashboardData, SalesSummary } from '../../interfaces/reports.interface';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit {

  private reportsService = inject(ReportsService);

  public loading = true;
  public dashboardData: DashboardData = {
    salesSummary: {
      totalRevenue: 0,
      orderCount: 0,
      averageTicket: 0,
      period: 'monthly'
    },
    ordersStatus: {
      ordersByStatus: [],
      pendingOrders: 0
    },
    topProducts: [],
    popularCategories: []
  };
  public selectedPeriod: 'monthly' | 'annual' = 'monthly';

  // Para gráfico de pedidos por cada estado
  public orderStatusChartData: { name: string; value: number }[] = [];

  private statusMap: { [key: string]: string } = {
    'processing': 'En procesamiento',
    'shipped': 'Enviados',
    'delivered': 'Entregados',
    'cancelled': 'Cancelados'
  };


  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.reportsService.getDashboardData().subscribe({
      next: (data: DashboardData) => {
        this.dashboardData = data;
        this.prepareChartData();
        this.loading = false;
      },
      error: (e) => {
        console.error('Error al cargar los datos del dashboard', e);
        this.loading = false;
      }
    });
  }

  changePeriod(period: 'monthly' | 'annual'): void {
    this.selectedPeriod = period;
    this.reportsService.getSalesSummary(period).subscribe({
      next: (data: SalesSummary) => {
        this.dashboardData.salesSummary = data;
      },
      error: (e) => {
        console.error(`Error al cargar el resumen de ventas para el período ${period}`, e);
      }
    });
  }

  prepareChartData(): void {
    const defaultStatuses = ['En procesamiento', 'Enviados', 'Entregados', 'Cancelados'];

    // Inicializa el array con todos los estados y los valores de 0
    this.orderStatusChartData = defaultStatuses.map(status => {
      const foundStatus = this.dashboardData.ordersStatus.ordersByStatus.find(orderStatus =>
        this.formatStatusLabel(orderStatus.status) === status);
      return {
        name: status,
        value: foundStatus ? parseInt(foundStatus.count, 10) : 0
      };
    });
  }

  formatStatusLabel(status: string): string {
    return this.statusMap[status] || status;
  }

  getTotalOrders(): number {
    return this.orderStatusChartData.reduce((sum, status) => sum + status.value, 0)
  }

  formatCurrency(value: number | string): string {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(numValue);
  }
}
