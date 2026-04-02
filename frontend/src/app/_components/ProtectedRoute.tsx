"use client";

import { redirect } from "next/navigation";

import { useUserQuery, type UserRole } from "@/entities/user";
import { ApiError } from "@/shared/api/core/apiError";
import { ROUTES } from "@/shared/routes/routes";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const { data, error, isPending } = useUserQuery();
  console.log("ProtectedRoute", { data, error, isPending });
  const role = data?.role as UserRole | undefined;

  if (isPending) {
    return null;
  }

  if (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        redirect(ROUTES.login);
      }

      if (error.status === 403) {
        redirect(ROUTES.forbidden);
      }
    }

    throw error;
  }

  if (!role) {
    return null;
  }

  if (role !== allowedRole) {
    redirect(ROUTES.forbidden);
  }

  return <>{children}</>;
};
