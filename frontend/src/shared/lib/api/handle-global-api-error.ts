import { ApiError } from "@/shared/api/core/api-error";
import { emitToast } from "@/shared/model/toast/toast-service";
import { getErrorToastContent } from "./get-error-toast-content";
import { shouldShowErrorToast } from "./should-show-err-toast";

export const handleGlobalApiError = (error: unknown) => {
  if (!(error instanceof ApiError)) {
    return;
  }

  if (!shouldShowErrorToast(error)) {
    return;
  }

  const toastContent = getErrorToastContent(error);

  emitToast({
    variant: "error",
    title: toastContent.title,
    message: toastContent.message,
  });
};
