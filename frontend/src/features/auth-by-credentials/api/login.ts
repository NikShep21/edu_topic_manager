import { LOGIN_PATH } from "@/features/auth-by-credentials/api/constants";
import type {
  LoginResponse,
  LoginRequest,
} from "@/features/auth-by-credentials/api/types";
import { fetchClient } from "@/shared/api";

export const login = async (dataLogin: LoginRequest) => {
  const response: Response = await fetchClient.post(LOGIN_PATH, dataLogin);
  const data: LoginResponse = await response.json();
  return data;
};
