import { Role } from "./role";

role: Role;

export interface User {
  id: string;
  email: string;
  fullname: string;
  phoneNumber?: string;
  role: "ADMIN" | "LEARNER" | "FACILITATOR";
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}
