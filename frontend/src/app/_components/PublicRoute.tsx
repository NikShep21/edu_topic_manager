"use client";

import { redirect } from "next/navigation";

import { ApiError } from "@/shared/api";
import { ROUTES } from "@/shared/routes/routes";
import { useGetUser } from "@/entities/user/current";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { data, error, isPending } = useGetUser();

  const role = data?.role;

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
