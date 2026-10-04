import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import {
  ActionGroup,
  Button,
  Column,
  InvalidFormAlert,
} from "@amsterdam/design-system-react"
import {
  FormProvider,
  mapErrorsToAlert,
  SelectControl,
} from "@amsterdam/ee-ads-rhf"
import { useStartWorkflowProcess, useWorkflowProcesses } from "@/api/hooks"
import { useAfterCaseFormSubmit } from "../useAfterCaseFormSubmit"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
}

type FormValues = {
  /** The id of the task (a workflow option) to start. */
  workflowProcess: string
}

/**
 * Starts a task on a case. Saves right away: what is wrong or missing is told
 * in the form itself.
 */
const TaskForm: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate()
  const { data: processes } = useWorkflowProcesses(id)
  const { mutateAsync: startWorkflowProcess, isPending } =
    useStartWorkflowProcess(id)
  const afterSubmit = useAfterCaseFormSubmit(id)
  const form = useForm<FormValues>({ defaultValues: { workflowProcess: "" } })
  const { errors } = form.formState

  const onSubmit = async ({ workflowProcess }: FormValues) => {
    try {
      await startWorkflowProcess({
        workflow_option_id: Number(workflowProcess),
      })
    } catch {
      // The error is shown as a message at the top of the page; the form stays.
      return
    }
    await afterSubmit()
  }

  return (
    <FormProvider form={form} onSubmit={onSubmit}>
      <Column gap="large">
        <InvalidFormAlert
          errors={mapErrorsToAlert(errors)}
          heading="Verbeter de fouten voor je verder gaat"
          headingLevel={2}
        />
        <SelectControl<FormValues>
          name="workflowProcess"
          label="Taak"
          description="Kies de taak die je op deze zaak wilt opvoeren."
          options={[
            { label: "Selecteer een taak", value: "" },
            ...(processes ?? []).map(({ id, name }) => ({
              label: name,
              value: String(id),
            })),
          ]}
          registerOptions={{ required: "Kies een taak." }}
          disabled={processes === undefined}
        />
        <ActionGroup>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Bezig met opvoeren…" : "Taak opvoeren"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(`/zaken/${id}`)}
          >
            Annuleren
          </Button>
        </ActionGroup>
      </Column>
    </FormProvider>
  )
}

export default TaskForm
