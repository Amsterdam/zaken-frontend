import { useForm, useWatch } from "react-hook-form"
import {
  SelectControl,
  TextAreaControl,
  TextInputControl,
} from "@amsterdam/ee-ads-rhf"
import { useCase, useCreateDecision, useDecisionTypes } from "@/api/hooks"
import { CaseFormPage } from "app/components/case/CaseFormPage/CaseFormPage"
import { useAfterCaseFormSubmit } from "../useAfterCaseFormSubmit"
import DecisionHeader, { type Workflow } from "./components/DecisionHeader"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
}

type FormValues = {
  decision_type: string
  sanction_amount: string
  description: string
}

// The decision type that needs an explanation.
const DECISION_TYPE_WITH_EXPLANATION = 9

/** The page to say which decision was made on a case, and its sanction. */
const DecisionForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const { data: caseItem } = useCase(id)
  const { data: types } = useDecisionTypes(caseItem?.theme.id)
  const { mutateAsync: createDecision, isPending } = useCreateDecision(id)
  const afterSubmit = useAfterCaseFormSubmit(id)
  const form = useForm<FormValues>({
    defaultValues: { decision_type: "", sanction_amount: "", description: "" },
  })
  const typeId = useWatch({ control: form.control, name: "decision_type" })
  // Only a decision with a sanction has an amount.
  const isSanction =
    types?.results?.find(({ id }) => String(id) === typeId)?.is_sanction ===
    true
  const needsExplanation = Number(typeId) === DECISION_TYPE_WITH_EXPLANATION

  const onSubmit = async (values: FormValues) => {
    try {
      await createDecision({
        case: id,
        case_user_task_id: caseUserTaskId,
        decision_type: Number(values.decision_type),
        sanction_amount: isSanction ? values.sanction_amount.trim() : null,
        // Without an explanation the field is left out, as before.
        ...(values.description.trim() !== "" && {
          description: values.description,
        }),
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
        name="decision_type"
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
      <TextInputControl<FormValues>
        name="sanction_amount"
        label="Wat is het opgelegde bedrag?"
        // As wide as an amount is.
        size={10}
        description="Vul alleen cijfers in, geen punten, komma's of tekens."
        // The keyboard for numbers.
        attributes={{ inputMode: "numeric" }}
        registerOptions={{
          required: "Vul het bedrag in.",
          pattern: {
            value: /^\s*\d+\s*$/,
            message: "Vul alleen cijfers in, geen punten, komma's of tekens.",
          },
        }}
        shouldShow={isSanction}
      />
      <TextAreaControl<FormValues>
        name="description"
        label="Korte toelichting"
        rows={4}
        registerOptions={{
          required: needsExplanation && "Vul een toelichting in.",
        }}
      />
    </CaseFormPage>
  )
}

export default DecisionForm
