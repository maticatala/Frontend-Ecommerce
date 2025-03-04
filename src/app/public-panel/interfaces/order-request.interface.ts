export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  postCode: string;
  state: string;
  country: string;
}

export interface OrderedProduct {
  id: number;
  product_quantity: number;
}

export interface Payment {
  paymentType: string;
  amount: number;
  currency: string;
}

export interface OrderRequest {
  shippingAddress: ShippingAddress;
  orderedProducts: OrderedProduct[];
  payments: Payment[];
}
