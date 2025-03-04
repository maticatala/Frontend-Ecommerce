import { User } from "src/app/auth/interfaces";
import { ShippingAddress } from "./shippingAddress.interface";
import { Product } from "src/app/shared/interfaces/product.interface";
import { OrderStatus } from "../enums/order-status.enum";
import { PaymentStatus } from "../enums/payment-status.enum";


export interface Order {
  id:              number;
  status:          OrderStatus;
  orderAt:         Date;
  shippedAt:       null;
  deliveredAt:     null;
  shippingAddress: ShippingAddress;
  user:            User;
  products:        ProductElement[];
  payments:        Payment[];
  total?: number; // Agrega el atributo total aquí
}

export interface Payment {
  id:            number;
  paymentType:   string;
  amount:        string;
  currency:      string;
  status:        PaymentStatus;
  transactionId: null;
  paymentDate:   Date;
  installments: number;
  paymentMethodType: string;
  paymentFinancialSystem: string;
}

export interface ProductElement {
  id:                 number;
  product_unit_price: number;
  product_quantity:   number;
  product:            Product;
}
