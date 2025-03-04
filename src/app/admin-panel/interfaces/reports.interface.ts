// src/app/admin-panel/interfaces/report.interface.ts
export interface SalesSummary {
  totalRevenue: number; // ingresos totales
  orderCount: number; // pedidos completados
  averageTicket: number; // ticket promedio
  period: 'monthly' | 'annual' | 'historical'; // periodo
  year?: number;
  month?: number;
}

export interface OrderStatusCount {
  status: string;
  count: string;
}

export interface OrdersStatus {
  ordersByStatus: OrderStatusCount[];
  pendingOrders: number;
}

export interface TopProduct {
  productId: number;
  productName: string;
  totalQuantity: string;
  totalRevenue: string;
}

export interface PopularCategory {
  categoryId: number;
  categoryName: string;
  orderCount: string;
}

export interface DashboardData {
  salesSummary: SalesSummary;  //resumen de ventas
  ordersStatus: OrdersStatus; //estado de los pedidos
  topProducts: TopProduct[]; //productos más vendidos
  popularCategories: PopularCategory[]; //categorías más populares
}

