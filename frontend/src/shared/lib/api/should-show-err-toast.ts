import type { ApiError } from "@/shared/api";

export const shouldShowErrorToast = (error: ApiError) => {
  return error.status === 0 || error.status >= 500;
};
