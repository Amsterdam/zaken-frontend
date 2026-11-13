import type { ApiError } from "@/api/types/apiError"

// The fields of an ApiError that are not the body of the response.
const OWN_FIELDS = ["status", "message", "url"]

/**
 * What went wrong with checking or importing the file, for the user. The
 * backend says it as `{"error": "…"}` (the file), `{"detail": "…"}` or, for
 * the fields of the request, `{"reason_id": ["…"]}` (Django REST Framework).
 */
export const getErrorMessage = (error: unknown) => {
  const apiError = error as (ApiError & Record<string, unknown>) | undefined
  if (typeof apiError?.error === "string" && apiError.error) {
    return apiError.error
  }
  if (apiError?.detail) return apiError.detail

  const fieldMessages = Object.entries(apiError ?? {})
    .filter(([key]) => !OWN_FIELDS.includes(key))
    .flatMap(([, value]) => (Array.isArray(value) ? value : [value]))
    .filter((value): value is string => typeof value === "string" && !!value)
  if (fieldMessages.length > 0) return fieldMessages.join(" ")

  return "Probeer het later opnieuw."
}
