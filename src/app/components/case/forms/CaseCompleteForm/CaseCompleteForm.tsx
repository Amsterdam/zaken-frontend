import { useForm, useWatch } from "react-hook-form"
import { RadioControl, TextAreaControl } from "@amsterdam/ee-ads-rhf"
import {
  useCase,
  useCaseCloseReasons,
  useCaseCloseResults,
  useCloseCase,
} from "@/api/hooks"
import { CaseFormPage } from "app/components/case/CaseFormPage/CaseFormPage"
import { useAfterCaseFormSubmit } from "../useAfterCaseFormSubmit"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
}

type FormValues = {
  reason: string
  result: string
  description: string
}

const toOptions = (options: { id: number; name: string }[] = []) =>
  options.map(({ id, name }) => ({ label: name, value: String(id) }))

/** The page to close a case: why, with which result, and an explanation. */
const CaseCompleteForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const { data: caseItem } = useCase(id)
  const themeId = caseItem?.theme.id
  const { data: reasons } = useCaseCloseReasons(themeId)
  const { data: results } = useCaseCloseResults(themeId)
  const { mutateAsync: closeCase, isPending } = useCloseCase(id)
  const afterSubmit = useAfterCaseFormSubmit(id)
  const form = useForm<FormValues>({
    defaultValues: { reason: "", result: "", description: "" },
  })
  const reasonId = useWatch({ control: form.control, name: "reason" })
  // Only some reasons to close a case come with a result.
  const hasResult =
    reasons?.results?.find(({ id }) => String(id) === reasonId)?.result === true

  const onSubmit = async ({ reason, result, description }: FormValues) => {
    try {
      await closeCase({
        case: id,
        case_user_task_id: caseUserTaskId,
        reason: Number(reason),
        result: hasResult ? Number(result) : null,
        description,
      })
    } catch {
      // The error is shown as a message at the top of the page; the form stays.
      return
    }
    afterSubmit()
  }

  return (
    <CaseFormPage
      id={id}
      title="Zaak afronden"
      form={form}
      onSubmit={onSubmit}
      submitText="Zaak afronden"
      isPending={isPending}
    >
      <RadioControl<FormValues>
        name="reason"
        label="Wat is de reden?"
        options={toOptions(reasons?.results)}
        registerOptions={{ required: "Kies een reden." }}
      />
      {hasResult && (
        <RadioControl<FormValues>
          name="result"
          label="Wat is het resultaat?"
          options={toOptions(results?.results)}
          registerOptions={{ required: "Kies een resultaat." }}
        />
      )}
      <TextAreaControl<FormValues>
        name="description"
        label="Toelichting"
        rows={4}
        registerOptions={{ required: "Vul een toelichting in." }}
      />
    </CaseFormPage>
  )
}

export default CaseCompleteForm
