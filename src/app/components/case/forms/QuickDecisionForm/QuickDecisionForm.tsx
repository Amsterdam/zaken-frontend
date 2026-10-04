import { useForm } from "react-hook-form"
import { SelectControl, TextAreaControl } from "@amsterdam/ee-ads-rhf"
import {
  useCase,
  useCreateQuickDecision,
  useQuickDecisionTypes,
} from "@/api/hooks"
import { CaseFormPage } from "app/components/case/CaseFormPage/CaseFormPage"
import { useAfterCaseFormSubmit } from "../useAfterCaseFormSubmit"
import DecisionHeader, {
  type Workflow,
} from "../DecisionForm/components/DecisionHeader"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
}

type FormValues = {
  quick_decision_type: string
  description: string
}

/**
 * The page to say which decision was made on a case, without a sanction
 * ("snel besluit").
 */
const QuickDecisionForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const { data: caseItem } = useCase(id)
  const { data: types } = useQuickDecisionTypes(caseItem?.theme.id)
  const { mutateAsync: createQuickDecision, isPending } =
    useCreateQuickDecision(id)
  const afterSubmit = useAfterCaseFormSubmit(id)
  const form = useForm<FormValues>({
    defaultValues: { quick_decision_type: "", description: "" },
  })

  const onSubmit = async ({ quick_decision_type, description }: FormValues) => {
    try {
      await createQuickDecision({
        case: id,
        case_user_task_id: caseUserTaskId,
        quick_decision_type: Number(quick_decision_type),
        // Without an explanation the field is left out, as before.
        ...(description.trim() !== "" && { description }),
      })
    } catch {
      // The error is shown as a toast; the form stays.
      return
    }
    afterSubmit()
  }

  return (
    <CaseFormPage
      id={id}
      title="Resultaat besluit"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      intro={
        <DecisionHeader
          caseId={id}
          caseUserTaskId={caseUserTaskId}
          workflows={(caseItem?.workflows ?? []) as unknown as Workflow[]}
        />
      }
    >
      <SelectControl<FormValues>
        name="quick_decision_type"
        label="Welk besluit is opgesteld?"
        options={[
          { label: "Maak een keuze", value: "" },
          ...(types?.results ?? []).map(({ id, name }) => ({
            label: name,
            value: String(id),
          })),
        ]}
        registerOptions={{ required: "Kies een besluit." }}
      />
      <TextAreaControl<FormValues>
        name="description"
        label="Korte toelichting"
        rows={4}
      />
    </CaseFormPage>
  )
}

export default QuickDecisionForm
