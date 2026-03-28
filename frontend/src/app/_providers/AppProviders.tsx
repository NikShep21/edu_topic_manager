"use client";

import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./ThemeProvider";
import { queryClient } from "../../shared/api/react-query/query-client";
import { MswProvider } from "@/app/_providers/MswProvider";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MswProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </MswProvider>
  );
};
