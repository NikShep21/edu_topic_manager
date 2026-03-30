export type ToastVariant = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

export interface ShowToastParams {
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (toast: ShowToastParams) => void;
  removeToast: (id: string) => void;
}
