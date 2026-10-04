import { useForm, useWatch } from "react-hook-form"
import { ActionGroup, Button, Dialog } from "@amsterdam/design-system-react"
import { FormProvider, SelectControl } from "@amsterdam/ee-ads-rhf"
import {
  useRefreshCaseWorkflowsSoon,
  useStartWorkflowProcess,
  useWorkflowProcesses,
} from "@/api/hooks"
import { useToast } from "@/components/toasts/useToast"
import { OpenDialog } from "@/components/OpenDialog/OpenDialog"

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
  const form = useForm<FormValues>({ defaultValues: { workflowProcess: "" } })
  // Nothing to start until a task is chosen.
  const hasChoice =
    useWatch({ control: form.control, name: "workflowProcess" }) !== ""

  const onSubmit = async ({ workflowProcess }: FormValues) => {
    try {
      await startWorkflowProcess({
        workflow_option_id: Number(workflowProcess),
      })
    } catch {
      // The error is shown as a message at the top of the page; the dialog stays.
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
    <OpenDialog
      heading="Taak opvoeren"
      onClose={onClose}
      footer={
        <ActionGroup>
          {/* The footer is outside the form, so the button submits it itself. */}
          <Button
            type="button"
            disabled={isPending || !hasChoice}
            onClick={() => void form.handleSubmit(onSubmit)()}
          >
            {isPending ? "Bezig met opvoeren…" : "Taak opvoeren"}
          </Button>
          <Button type="button" variant="secondary" onClick={Dialog.close}>
            Annuleren
          </Button>
        </ActionGroup>
      }
    >
      <FormProvider form={form} onSubmit={onSubmit}>
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
          // Room between the field and the buttons of the dialog.
          wrapperProps={{ className: "ams-mb-l" }}
          disabled={processes === undefined}
          inFieldSet
        />
      </FormProvider>
    </OpenDialog>
  )
}

export default TaskDialog
