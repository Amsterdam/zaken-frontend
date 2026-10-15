/**
 * Error thrown by useApiFetch when the API doesn't respond with a 2xx status.
 * The JSON body of the response is spread onto it, so Django REST Framework's
 * `detail` ends up here too.
 */
export type ApiError = {
  status: number
  message: string
  url?: string
  detail?: string
}
