import { LOGIN_PATH } from "@/features/auth-by-credentials/api/constants";
import type {
  LoginResponse,
  LoginRequest,
} from "@/features/auth-by-credentials/api/types";
import { fetchClient } from "@/shared/api";

export const login = async (dataLogin: LoginRequest): Promise<LoginResponse> => {
  return fetchClient.post<LoginResponse>(LOGIN_PATH, dataLogin);
};
