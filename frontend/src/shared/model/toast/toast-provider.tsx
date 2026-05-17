"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ToastContext } from "./toast-context";
import type { ShowToastParams, ToastItem } from "./toast-types";
import { subscribeToToasts } from "./toast-service";
import { ToastContainer } from "@/shared/ui/toast/toast-container";

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((toast: ShowToastParams) => {
    setToasts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: toast.title,
        message: toast.message,
        variant: toast.variant ?? "info",
        duration: toast.duration ?? 5000,
      },
    ]);
  }, []);

  useEffect(() => {
    return subscribeToToasts(showToast);
  }, [showToast]);

  const value = useMemo(
    () => ({
      toasts,
      showToast,
      removeToast,
    }),
    [toasts, showToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};
