export interface AppRoute {
 path: string;
 data: any;
 children?: AppRoute[];
}


export const childRoutes: AppRoute[] = [
 {
   path: 'users',
   data: { icon: 'table', text: 'Users' }
 },
 {
   path: 'categories',
   data: { icon: 'category', text: 'Categories' }
 },
 {
   path: 'Products',
   data: { text: 'Products' },
   children: [{
     path: 'product',
     data: { icon: 'playlist_add', text: 'Create Product' },
   },
   {
     path: 'products',
     data: { icon: 'view_list', text: 'Product List' }
   }
   ]
 },
 {
   path: 'orders',
   data: { icon: 'inventory_2', text: 'Orders' }
 },
];
