import type { ApiError } from "@/api/types/apiError"

export const getErrorMessage = (error: unknown) => {
  const apiError = error as (ApiError & { error?: unknown }) | undefined
  if (
    (apiError?.status === 400 || apiError?.status === 500) &&
    typeof apiError.error === "string" &&
    apiError.error
  ) {
    return apiError.error
  }

  return apiError?.detail || apiError?.message || "Probeer het later opnieuw."
}

