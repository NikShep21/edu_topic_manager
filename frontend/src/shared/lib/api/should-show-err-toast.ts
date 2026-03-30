import { ApiError } from "@/shared/api/core/api-error";

export const shouldShowErrorToast = (error: ApiError) => {
  return error.status === 0 || error.status >= 500;
};
