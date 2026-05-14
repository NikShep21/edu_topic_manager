import { LOGIN_PATH } from "@/entities/session/api/constants";
import type { LoginResponse, LoginRequest } from "@/entities/session/api/types";
import { fetchClient } from "@/shared/api";

export const login = async (dataLogin: LoginRequest): Promise<LoginResponse> => {
  return fetchClient.post<LoginResponse>(LOGIN_PATH, dataLogin);
};
