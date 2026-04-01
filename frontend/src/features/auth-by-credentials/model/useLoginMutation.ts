import { login } from "@/features/auth-by-credentials/api/login";
import type {
  LoginRequest,
  LoginResponse,
} from "@/features/auth-by-credentials/api/types";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
  });
};
