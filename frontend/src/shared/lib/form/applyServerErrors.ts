import { ApiError } from "@/shared/api";
import { Path, UseFormSetError } from "react-hook-form";

type ServerFieldErrors = Record<string, string[]>;

type ValidationErrorPayload = {
  errors: ServerFieldErrors;
};

function isValidationErrorPayload(data: unknown): data is ValidationErrorPayload {
  if (typeof data !== "object" || data === null) return false;
  if (!("errors" in data)) return false;

  const { errors } = data as { errors: unknown };

  if (typeof errors !== "object" || errors === null) return false;

  return Object.values(errors).every(
    (value) => Array.isArray(value) && value.every((item) => typeof item === "string"),
  );
}

export function applyServerErrors<T extends Record<string, unknown>>(
  error: unknown,
  setError: UseFormSetError<T>,
  fieldMap?: Partial<Record<string, Path<T>>>,
) {
  if (!(error instanceof ApiError) || error.status !== 400) return;
  if (!isValidationErrorPayload(error.data)) return;

  for (const [serverField, messages] of Object.entries(error.data.errors)) {
    const message = messages?.[0];
    if (!message) continue;

    const formField = fieldMap?.[serverField] ?? (serverField as Path<T>);

    setError(formField, {
      type: "server",
      message,
    });
  }
}
