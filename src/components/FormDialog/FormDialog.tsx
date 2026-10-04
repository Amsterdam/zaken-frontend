import { type ReactNode } from "react"
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form"
import { ActionGroup, Button, Dialog } from "@amsterdam/design-system-react"
import { FormProvider } from "@amsterdam/ee-ads-rhf"
import { OpenDialog } from "@/components/OpenDialog/OpenDialog"

type Props<T extends FieldValues> = {
  heading: string
  /** The react-hook-form form the fields (the children) belong to. */
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
  submitText?: string
  /** While saving: the submit button is off and says so. */
  isPending?: boolean
  pendingText?: string
  /** False while there is nothing to submit yet (e.g. no choice made). */
  canSubmit?: boolean
  onClose: () => void
  children: ReactNode
}

/**
 * A short form in a dialog (react-hook-form with the fields of
 * @amsterdam/ee-ads-rhf): the fields, and in the dialog's footer the button
 * that submits and "Annuleren". Open for as long as it is rendered.
 */
export function FormDialog<T extends FieldValues>({
  heading,
  form,
  onSubmit,
  submitText = "Opslaan",
  isPending = false,
  pendingText = "Bezig met opslaan…",
  canSubmit = true,
  onClose,
  children,
}: Props<T>) {
  return (
    <OpenDialog
      heading={heading}
      onClose={onClose}
      footer={
        <ActionGroup>
          {/* The footer is outside the form, so the button submits it itself. */}
          <Button
            type="button"
            disabled={isPending || !canSubmit}
            onClick={() => void form.handleSubmit(onSubmit)()}
          >
            {isPending ? pendingText : submitText}
          </Button>
          <Button type="button" variant="secondary" onClick={Dialog.close}>
            Annuleren
          </Button>
        </ActionGroup>
      }
    >
      <FormProvider form={form} onSubmit={onSubmit}>
        {/* Room between the fields and the buttons of the dialog. */}
        <div className="ams-mb-l">{children}</div>
      </FormProvider>
    </OpenDialog>
  )
}

export default FormDialog
