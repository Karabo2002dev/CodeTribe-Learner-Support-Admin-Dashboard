import { Role } from "./role";


export interface User {
  id: string;
  email: string;
  fullname: string;
  phone_number: string;
  role: Role;
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}
