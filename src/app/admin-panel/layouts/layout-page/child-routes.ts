export interface AppRoute {
  path: string;
  data: any;
  children?: AppRoute[];
}

export const childRoutes: AppRoute[] = [
  {
    path: 'reports',
    data: { icon: 'bar_chart', text: 'Reportes' },
  },
  {
    path: 'users',
    data: { icon: 'table', text: 'Usuarios' },
  },
  {
    path: 'Categories',
    data: { text: 'Categorias' },
    children:[
      {
        path: 'category',
        data: { icon: 'playlist_add', text: 'Crear Categorias' },
      },
      {
        path: 'categories',
        data: { icon: 'view_list', text: 'Listado de Categorias' },
      },
    ]
  },
  {
    path: 'Products',
    data: { text: 'Productos' },
    children: [
      {
        path: 'product',
        data: { icon: 'playlist_add', text: 'Crear Productos' },
      },
      {
        path: 'products',
        data: { icon: 'view_list', text: 'Listado de Productos' },
      },
    ],
  },
  {
    path: 'orders',
    data: { icon: 'inventory_2', text: 'Pedidos' },
  },

];
