"use client";

import { useEffect } from "react";

import { refreshSession } from "@/entities/session";
import { setRefreshSessionHandler } from "@/shared/api";

interface AuthRefreshProviderProps {
  children: React.ReactNode;
}

export const AuthRefreshProvider = ({ children }: AuthRefreshProviderProps) => {
  useEffect(() => {
    setRefreshSessionHandler(refreshSession);
  }, []);

  return children;
};
