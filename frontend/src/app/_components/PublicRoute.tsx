"use client";

import { redirect } from "next/navigation";

import { useUserQuery, type UserRole } from "@/entities/user";
import { ApiError } from "@/shared/api/core/apiError";
import { ROUTES } from "@/shared/routes/routes";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { data, error, isPending } = useUserQuery();

  const role = data?.role as UserRole | undefined;

  if (isPending) {
    return null;
  }

  if (error) {
    if (error instanceof ApiError && error.status === 401) {
      return <>{children}</>;
    }

    throw error;
  }

  if (role) {
    redirect(ROUTES[role]);
  }

  return <>{children}</>;
};
