import dayjs from "dayjs"
import { useForm } from "react-hook-form"
import { DateControl } from "@amsterdam/ee-ads-rhf"
import { useUpdateTask } from "@/api/hooks"
import { FormDialog } from "@/components/FormDialog/FormDialog"
import { useToast } from "@/components/toasts/useToast"
import { formatDate } from "@/shared/dateFormatters"
import { appendTimeToDate } from "@/shared/helpers"

type Props = {
  caseId: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
  dueDate: Tasks.WorkflowTask["due_date"]
  onClose: () => void
}

type FormValues = { date: string }

// The value of a date field.
const DATE_FORMAT = "YYYY-MM-DD"

/** Changes the due date of a task, in a dialog. Render it while it is open. */
const ChangeDueDateDialog: React.FC<Props> = ({
  caseId,
  caseUserTaskId,
  dueDate,
  onClose,
}) => {
  const { mutateAsync: updateTask, isPending } = useUpdateTask(
    caseUserTaskId,
    caseId,
  )
  const { showToast } = useToast()
  const current = formatDate(dueDate, DATE_FORMAT) ?? ""
  const today = dayjs().format(DATE_FORMAT)
  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { date: current },
  })

  const onSubmit = async ({ date }: FormValues) => {
    // Nothing changed: nothing to save.
    if (date === current) {
      onClose()
      return
    }
    try {
      await updateTask({ due_date: appendTimeToDate(date) })
    } catch {
      // The error is shown as a toast; the dialog stays.
      return
    }
    showToast({
      severity: "success",
      title: "Slotdatum gewijzigd",
      description: (
        <>
          De nieuwe slotdatum van de taak is <strong>{formatDate(date)}</strong>
          .
        </>
      ),
    })
    onClose()
  }

  return (
    <FormDialog
      heading="Slotdatum wijzigen"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      onClose={onClose}
    >
      <DateControl<FormValues>
        name="date"
        label="Wat is de nieuwe slotdatum?"
        min={today}
        registerOptions={{
          required: "Vul een datum in.",
          validate: (date) =>
            date === current ||
            date >= today ||
            "De slotdatum kan niet in het verleden liggen.",
        }}
        inFieldSet
      />
    </FormDialog>
  )
}

export default ChangeDueDateDialog
