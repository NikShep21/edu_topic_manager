"use client";

import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./ThemeProvider";
import { queryClient } from "../../shared/api/react-query/queryClient";
// import { MswProvider } from "@/app/_providers/MswProvider";
import { ToastProvider } from "@/shared/model/toast/toast-provider";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    // <MswProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
        <ToastProvider>{children}</ToastProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
    // </MswProvider>
  );
};
