import { useState } from "react"
import {
  ActionGroup,
  Button,
  Dialog,
  Paragraph,
} from "@amsterdam/design-system-react"
import { pointToFeedbackLink } from "@/components/DefaultLayout/pointToFeedbackLink"
import { OpenDialog } from "@/components/OpenDialog/OpenDialog"
import styles from "./FeedbackButton.module.css"

/**
 * The old "Feedback" tab on the right edge of every page. Feedback is now sent
 * from the link in the footer; for a while the tab stays, says so, and on
 * closing points to that link.
 */
export function Feedback() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className={styles.feedbackButton}
        onClick={() => setIsOpen(true)}
      >
        Feedback
      </button>
      {isOpen && (
        <OpenDialog
          heading="Feedback"
          onClose={() => {
            setIsOpen(false)
            pointToFeedbackLink()
          }}
          footer={
            <ActionGroup>
              <Button type="button" onClick={Dialog.close}>
                Sluiten
              </Button>
            </ActionGroup>
          }
        >
          <Paragraph>
            De feedbackknop is verplaatst naar de footer, onderaan de pagina.
          </Paragraph>
        </OpenDialog>
      )}
    </>
  )
}
