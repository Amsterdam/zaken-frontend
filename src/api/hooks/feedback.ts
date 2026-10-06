import { useMutation } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { makeApiUrl } from "@/api/utils/makeApiUrl"

type Feedback = components["schemas"]["Feedback"]

// app_name is filled in by the backend.
type FeedbackPayload = Omit<Feedback, "app_name">

/** Sends feedback, with the page and the browser it comes from. */
export const useSendFeedback = () => {
  const fetch = useApiFetch()

  return useMutation({
    mutationFn: (feedback: string) =>
      fetch<Feedback>(makeApiUrl("feedback"), {
        method: "POST",
        data: {
          feedback,
          url: window.location.href,
          user_agent: navigator.userAgent,
          screen: `${window.innerWidth}x${window.innerHeight}`,
        } satisfies FeedbackPayload,
      }),
  })
}
