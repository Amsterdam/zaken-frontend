import { useState } from "react"
import { FeedbackDialog } from "@/components/FeedbackDialog/FeedbackDialog"
import styles from "./FeedbackButton.module.css"

/**
 * The old "Feedback" tab on the right edge of every page. Feedback is now sent
 * from the link in the footer; for a while the tab stays and opens the same
 * dialog, which says where the link is now.
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
        <FeedbackDialog
          notice="Je vindt dit formulier voortaan ook onderaan elke pagina, bij “Stuur je vraag of feedback”."
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
