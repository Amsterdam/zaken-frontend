import { useState, type SubmitEventHandler } from "react"
import {
  ActionGroup,
  Button,
  Dialog,
  Label,
  TextArea,
} from "@amsterdam/design-system-react"
import { useSendFeedback } from "@/api/hooks"
import { OpenDialog } from "@/components/OpenDialog/OpenDialog"
import { useToast } from "@/components/toasts/useToast"

const FORM_ID = "feedback-form"

type Props = {
  onClose: () => void
}

export function FeedbackDialog({ onClose }: Props) {
  const [feedback, setFeedback] = useState("")
  const sendFeedback = useSendFeedback()
  const { showToast } = useToast()

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!feedback.trim()) return

    // The error is shown as a toast; the dialog stays.
    sendFeedback.mutate(feedback, {
      onSuccess: () => {
        onClose()
        showToast({
          title: "Bedankt voor je feedback",
          description: "We hebben je melding ontvangen.",
          severity: "success",
        })
      },
    })
  }

  return (
    <OpenDialog
      heading="Feedback"
      onClose={onClose}
      footer={
        <ActionGroup>
          <Button
            type="submit"
            form={FORM_ID}
            disabled={sendFeedback.isPending || !feedback.trim()}
            aria-busy={sendFeedback.isPending}
          >
            {sendFeedback.isPending ? "Versturen..." : "Versturen"}
          </Button>
          <Button onClick={Dialog.close} variant="secondary" type="button">
            Annuleren
          </Button>
        </ActionGroup>
      }
    >
      <form id={FORM_ID} onSubmit={onSubmit}>
        <Label htmlFor="feedback-text" inFieldSet>
          Wat is je feedback of welke bug heb je gevonden?
        </Label>
        <TextArea
          id="feedback-text"
          name="feedback"
          rows={5}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </form>
    </OpenDialog>
  )
}
