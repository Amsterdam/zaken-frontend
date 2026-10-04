import { type ReactNode } from "react"
import {
  ActionGroup,
  Button,
  Dialog,
  Paragraph,
} from "@amsterdam/design-system-react"
import { OpenDialog } from "@/components/OpenDialog/OpenDialog"

type Props = {
  title?: string
  children?: ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  /** Also called when the dialog is closed with Escape or the close button. */
  onCancel: () => void
}

/**
 * Asks to confirm an action, in an Amsterdam Design System dialog (after
 * top-frontend-v2). Replaces the asc-ui ConfirmModal. Render it while the
 * question is open: it opens as a modal when it appears.
 */
export function ConfirmDialog({
  title = "Weet je het zeker?",
  children = "Weet je zeker dat je door wilt gaan met het uitvoeren van deze actie?",
  confirmText = "Doorgaan",
  cancelText = "Annuleren",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <OpenDialog
      heading={title}
      // The native close: Escape, the close button and "Annuleren".
      onClose={onCancel}
      footer={
        <ActionGroup>
          <Button onClick={onConfirm}>{confirmText}</Button>
          <Button variant="secondary" onClick={Dialog.close}>
            {cancelText}
          </Button>
        </ActionGroup>
      }
    >
      <Paragraph>{children}</Paragraph>
    </OpenDialog>
  )
}

export default ConfirmDialog
