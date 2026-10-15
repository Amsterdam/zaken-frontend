import { useState } from "react"
import { useForm } from "react-hook-form"
import { TextAreaControl } from "@amsterdam/ee-ads-rhf"
import { FormDialog } from "@/components/FormDialog/FormDialog"
import { useToast } from "@/components/toasts/useToast"
import { SKIP_REASON, VISIT_SKIPPED } from "./skipVisit"
import { Paragraph } from "@amsterdam/design-system-react"

type Props = {
  taskName: string
  /** The label of the reason, as the backend calls it. */
  reasonLabel: string
  /** Completes the task; rejects when that failed. */
  onSubmit: (
    variables: Tasks.WorkflowTask["form_variables"],
  ) => Promise<unknown>
  onClose: () => void
}

type FormValues = { reason: string }

/**
 * Skips a planned visit, in a dialog: the task is completed without a visit
 * and the case goes on to the debrief. Render it while it is open.
 */
const SkipVisitDialog: React.FC<Props> = ({
  taskName,
  reasonLabel,
  onSubmit,
  onClose,
}) => {
  const [isPending, setIsPending] = useState(false)
  const { showToast } = useToast()
  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { reason: "" },
  })

  const skip = async ({ reason }: FormValues) => {
    setIsPending(true)
    try {
      await onSubmit({
        situation: { value: VISIT_SKIPPED },
        [SKIP_REASON]: { value: reason.trim() },
      })
    } catch {
      // The error is shown as a toast; the dialog stays.
      setIsPending(false)
      return
    }
    showToast({
      severity: "success",
      title: "Bezoek overgeslagen",
      description: (
        <>
          De taak <strong>{taskName}</strong> is afgerond zonder bezoek.
        </>
      ),
    })
    onClose()
  }

  return (
    <FormDialog
      heading="Bezoek overslaan"
      form={form}
      onSubmit={skip}
      submitText="Bezoek overslaan"
      pendingText="Bezig met overslaan…"
      isPending={isPending}
      onClose={onClose}
    >
      <Paragraph className="ams-mb-m">
        Is het huisbezoek niet meer nodig, bijvoorbeeld omdat de politie al ter
        plaatse is geweest? Dan kun je het overslaan. De zaak gaat direct door
        naar de debrief en het bezoek komt niet meer in TOP. De reden die je
        hieronder invult, komt in de zaakhistorie.
      </Paragraph>
      <TextAreaControl<FormValues>
        name="reason"
        label={reasonLabel}
        rows={4}
        registerOptions={{
          required: "Vul een reden in.",
          validate: (reason) => reason.trim() !== "" || "Vul een reden in.",
        }}
        inFieldSet
      />
    </FormDialog>
  )
}

export default SkipVisitDialog
