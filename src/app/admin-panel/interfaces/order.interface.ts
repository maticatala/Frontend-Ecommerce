import { User } from "src/app/auth/interfaces";
import { Product } from "./product.interface";
import { ShippingAddress } from "./shippingAddress.interface";

export interface Order {
  id:              number;
  status:          string;
  orderAt:         Date;
  shippedAt:       Date | null;
  deliveredAt:     Date | null;
  shippingAddress: ShippingAddress;
  user:            User;
  products:        ProductElement[];
}

export interface ProductElement {
  id:                 number;
  product_unit_price: string;
  product_quantity:   number;
  product:            Product;
}
