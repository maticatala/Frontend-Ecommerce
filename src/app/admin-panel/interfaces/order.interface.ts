import { User } from "src/app/auth/interfaces";
import { ShippingAddress } from "./shippingAddress.interface";
import { Product } from "src/app/shared/interfaces/product.interface";


export interface Order {
  id:              number;
  status:          string;
  orderAt:         Date;
  shippedAt:       null;
  deliveredAt:     null;
  shippingAddress: ShippingAddress;
  user:            User;
  products:        ProductElement[];
  payments:        Payment[];
}

export interface Payment {
  id:            number;
  paymentType:   string;
  amount:        string;
  currency:      string;
  status:        string;
  transactionId: null;
  paymentDate:   Date;
}

export interface ProductElement {
  id:                 number;
  product_unit_price: string;
  product_quantity:   number;
  product:            Product;
}
