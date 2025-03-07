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

  //* inicializacion de todos los campos recibidos desde el backend
  public dashboardData: DashboardData = {
    salesSummary: {
      totalRevenue: 0,
      confirmedRevenue: 0,
      pendingDeliveryRevenue: 0,
      expectedRevenue: 0,
      orderCount: 0,
      averageTicket: 0,
      period: 'monthly'
    },
    ordersStatus: [],
    topProducts: [],
    popularCategories: []
  };

  public loading = true;

  public selectedPeriod: 'monthly' | 'annual' | 'historical' = 'historical';
  public currentDate = new Date();
  public selectedYear: number = this.currentDate.getFullYear();
  public selectedMonth: number = this.currentDate.getMonth();
  public months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Para generar años para el selector (últimos 5 años)
  public availableYears: number[] = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  ).reverse();


  public orderStatusChartData: { name: string; value: number }[] = []; // Para gráfico de pedidos por cada estado

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

    this.reportsService.getDashboardData(
      this.selectedPeriod,
      this.selectedPeriod !== 'historical' ? this.selectedYear : undefined,
      this.selectedPeriod === 'monthly' ? this.selectedMonth : undefined
    ).subscribe({
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

  changePeriod(period: 'monthly' | 'annual' | 'historical'): void {
    this.selectedPeriod = period;
    this.updateSalesSummary();
  }

  changeYear(year: number): void {
    this.selectedYear = year;
    if (this.selectedPeriod !== 'historical') {
      this.updateSalesSummary();
    }
  }

  changeMonth(month: number): void {
    this.selectedMonth = month;
    if (this.selectedPeriod === 'monthly') {
      this.updateSalesSummary();
    }
  }

  updateSalesSummary(): void {

    this.reportsService.getSalesSummary(
      this.selectedPeriod,
      this.selectedPeriod !== 'historical' ? this.selectedYear : undefined,
      this.selectedPeriod === 'monthly' ? this.selectedMonth : undefined
    ).subscribe({
      next: (data: SalesSummary) => {
        this.dashboardData.salesSummary = data;
      },
      error: (e) => {
        console.error(`Error al cargar el resumen de ventas`, e);
      }
    });
  }

  prepareChartData(): void {
    const defaultStatuses = ['En procesamiento', 'Enviados', 'Entregados', 'Cancelados'];

    // Inicializa el array con todos los estados y los valores de 0
    this.orderStatusChartData = defaultStatuses.map(status =>
      {
      const foundStatus = this.dashboardData.ordersStatus.find(orderStatus =>
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

  getMonthName(monthIndex: number): string {
    return this.months[monthIndex];
  }

  getPeriodDescription(): string {
    if (this.selectedPeriod === 'monthly') {
      return `${this.getMonthName(this.selectedMonth)} ${this.selectedYear}`;
    } else if (this.selectedPeriod === 'annual') {
      return `Año ${this.selectedYear}`;
    } else {
      return 'Histórico completo';
    }
  }
}
