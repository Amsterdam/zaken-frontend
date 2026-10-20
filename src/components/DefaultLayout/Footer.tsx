import { useState } from "react"
import { PageFooter } from "@amsterdam/design-system-react"
import { FeedbackDialog } from "@/components/FeedbackDialog/FeedbackDialog"

/**
 * The footer of every page (like top-frontend-v2), with the link that opens
 * the dialog to send feedback or report a bug.
 */
export function Footer() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

  return (
    <>
      <PageFooter className="ams-page__area--footer">
        <PageFooter.Menu>
          <PageFooter.MenuLink
            href="#"
            onClick={(event) => {
              event.preventDefault()
              setIsFeedbackOpen(true)
            }}
          >
            Stuur je vraag of feedback
          </PageFooter.MenuLink>
        </PageFooter.Menu>
      </PageFooter>
      {isFeedbackOpen && (
        <FeedbackDialog onClose={() => setIsFeedbackOpen(false)} />
      )}
    </>
  )
}
