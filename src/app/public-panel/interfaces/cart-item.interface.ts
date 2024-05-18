import { Product } from "src/app/shared/interfaces/product.interface";

export interface CartItem {
  product: Product;
  quantity: number
};
