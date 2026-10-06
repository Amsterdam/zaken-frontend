import { type ReactNode, useEffect, useRef } from "react"
import { Dialog } from "@amsterdam/design-system-react"

type Props = {
  heading: string
  children: ReactNode
  footer?: ReactNode
  /** Called when the dialog closes: Escape, the close button, or Dialog.close. */
  onClose: () => void
}

/**
 * An Amsterdam Design System dialog that is open for as long as it is
 * rendered: it opens as a modal when it appears. Render it while its question
 * or form is in play, and stop rendering it in `onClose`.
 */
export function OpenDialog({ heading, children, footer, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  return (
    <Dialog ref={dialogRef} heading={heading} footer={footer} onClose={onClose}>
      {children}
    </Dialog>
  )
}
