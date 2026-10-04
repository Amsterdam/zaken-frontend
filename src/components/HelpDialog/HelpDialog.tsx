import { type ReactNode, useState } from "react"
import { createPortal } from "react-dom"
import { ActionGroup, Button, Dialog } from "@amsterdam/design-system-react"
import { OpenDialog } from "@/components/OpenDialog/OpenDialog"
import { StandaloneButton } from "@/components/StandaloneButton/StandaloneButton"

type Props = {
  /** The text of the button that opens the explanation. */
  label: string
  /** The heading of the dialog; the label when left out. */
  heading?: string
  /** The explanation. */
  children: ReactNode
}

/**
 * Help with a question of a form: a button that opens the explanation in a
 * dialog. Replaces the old InfoButton.
 */
export function HelpDialog({ label, heading = label, children }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <StandaloneButton onClick={() => setIsOpen(true)}>
        {label}
      </StandaloneButton>
      {/* Outside the form the button is in: a button of the dialog must not
          send the form. */}
      {isOpen &&
        createPortal(
          <OpenDialog
            heading={heading}
            onClose={() => setIsOpen(false)}
            footer={
              <ActionGroup>
                <Button type="button" onClick={Dialog.close}>
                  Sluiten
                </Button>
              </ActionGroup>
            }
          >
            {children}
          </OpenDialog>,
          document.body,
        )}
    </div>
  )
}

export default HelpDialog
