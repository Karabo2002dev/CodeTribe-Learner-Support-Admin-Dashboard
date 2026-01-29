export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: "ADMIN" | "LEARNER" | "FACILITATOR";
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}
