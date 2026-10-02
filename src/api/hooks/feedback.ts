import { useMutation } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { makeApiUrl } from "@/api/utils/makeApiUrl"

type Feedback = components["schemas"]["Feedback"]

// app_name is filled in by the backend.
export type FeedbackPayload = Omit<Feedback, "app_name">

export const useCreateFeedback = () => {
  const fetch = useApiFetch()

  return useMutation({
    mutationFn: (data: FeedbackPayload) =>
      fetch<Feedback>(makeApiUrl("feedback"), { method: "POST", data }),
  })
}
