// Generated by https://quicktype.io

import { Category } from "./category.interface";

export interface Product {
  id:          number;
  name:        string;
  createdAt:   Date;
  description: string;
  price:       number;
  imagen:      string;
  categories:  Category[];
  isDeleted:   boolean;
}

