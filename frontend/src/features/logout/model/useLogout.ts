"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@/shared/api";
import { useLogoutMutation } from "@/features/logout/model/useLogoutMutation";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useLogoutMutation();

  const logout = async () => {
    try {
      await mutation.mutateAsync();
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 401) {
        throw error;
      }
    } finally {
      queryClient.clear();
      router.push("/login");
    }
  };

  return {
    logout,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
