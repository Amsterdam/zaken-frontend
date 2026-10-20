import { useForm } from "react-hook-form"
import { SelectControl } from "@amsterdam/ee-ads-rhf"
import {
  useRefreshCaseWorkflowsSoon,
  useStartWorkflowProcess,
  useWorkflowProcesses,
} from "@/api/hooks"
import { useToast } from "@/components/toasts/useToast"
import { FormDialog } from "@/components/FormDialog/FormDialog"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
  onClose: () => void
}

type FormValues = {
  /** The id of the task (a workflow option) to start. */
  workflowProcess: string
}

/**
 * Starts a task on a case, in a dialog on the case page. Saves right away:
 * what is missing is told below the field. Render it while it is open.
 */
const TaskDialog: React.FC<Props> = ({ id, onClose }) => {
  const { data: processes } = useWorkflowProcesses(id)
  const { mutateAsync: startWorkflowProcess, isPending } =
    useStartWorkflowProcess(id)
  const refreshWorkflowsSoon = useRefreshCaseWorkflowsSoon(id)
  const { showToast } = useToast()
  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { workflowProcess: "" },
  })

  const onSubmit = async ({ workflowProcess }: FormValues) => {
    try {
      await startWorkflowProcess({
        workflow_option_id: Number(workflowProcess),
      })
    } catch {
      // The error is shown as a toast; the dialog stays.
      return
    }
    // Something that worked is a toast; alerts are for errors and information.
    showToast({
      severity: "success",
      title: "Taak opgevoerd",
      description:
        "De taak verschijnt bij de open taken zodra hij is aangemaakt.",
    })
    refreshWorkflowsSoon()
    onClose()
  }

  return (
    <FormDialog
      heading="Taak opvoeren"
      form={form}
      onSubmit={onSubmit}
      submitText="Taak opvoeren"
      pendingText="Bezig met opvoeren…"
      isPending={isPending}
      onClose={onClose}
    >
      <SelectControl<FormValues>
        name="workflowProcess"
        label="Welke taak wil je opvoeren?"
        options={[
          { label: "Selecteer een taak", value: "" },
          ...(processes ?? []).map(({ id, name }) => ({
            label: name,
            value: String(id),
          })),
        ]}
        registerOptions={{ required: "Kies een taak." }}
        disabled={processes === undefined}
        inFieldSet
      />
    </FormDialog>
  )
}

export default TaskDialog
