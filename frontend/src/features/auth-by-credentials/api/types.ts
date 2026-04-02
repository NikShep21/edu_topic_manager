import type { UserData } from "@/entities/user";

export interface LoginRequest {
  username: string;
  password: string;
  remember_me: boolean;
}

export interface LoginResponse {
  success: boolean;
  user: UserData;
}
