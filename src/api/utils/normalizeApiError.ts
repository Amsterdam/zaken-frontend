import type { ApiError } from "@/api/types/apiError"

const isApiError = (error: unknown): error is ApiError =>
  typeof error === "object" &&
  error !== null &&
  typeof (error as ApiError).status === "number"

/**
 * Turns anything a queryFn/mutationFn can throw (an ApiError from useApiFetch,
 * or e.g. a TypeError when the network is down) into an ApiError.
 */
export const normalizeApiError = (error: unknown): ApiError =>
  isApiError(error)
    ? error
    : {
        status: 0,
        message:
          error instanceof Error
            ? error.message
            : "Er is een onverwachte fout opgetreden.",
      }
