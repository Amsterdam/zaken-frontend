import { useState } from "react"
import { FeedbackDialog } from "@/components/FeedbackDialog/FeedbackDialog"
import styles from "./FeedbackButton.module.css"

/**
 * The "Feedback" tab on the right edge of every page, and the dialog it opens
 * to send feedback or report a bug.
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
      {isOpen && <FeedbackDialog onClose={() => setIsOpen(false)} />}
    </>
  )
}
