import { Roles } from "./roles.enum";


export interface User {
  id:      number;
  email:    string;
  firstName:     string;
  lastName:     string;
  createdAt: Date;
  rol:    Roles;
}

