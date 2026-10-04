import { useForm, useWatch } from "react-hook-form"
import {
  CheckboxControl,
  RadioControl,
  SelectControl,
  TextAreaControl,
} from "@amsterdam/ee-ads-rhf"
import {
  useCase,
  useCaseThemes,
  useCreateDebriefing,
  useViolationTypes,
} from "@/api/hooks"
import { CaseFormPage } from "app/components/case/CaseFormPage/CaseFormPage"
import { useAfterCaseFormSubmit } from "../useAfterCaseFormSubmit"
import { ViolationHelp } from "./components/ViolationHelp"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
}

type FormValues = {
  violation: string
  theme: string
  nuisance_detected: boolean
  feedback: string
}

// The outcome that hands the case over to another theme.
const SEND_TO_OTHER_THEME = "SEND_TO_OTHER_THEME"
// A theme a case can be handed over to that is not one of ours.
const EXTRA_THEME = "Woningverbetering"

/** The page to give the feedback of the debrief of a visit. */
const DebriefCreateForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const { data: caseItem } = useCase(id)
  const themeName = caseItem?.theme.name
  const { data: violationTypes } = useViolationTypes(caseItem?.theme.id)
  const { data: themes } = useCaseThemes()
  const { mutateAsync: createDebriefing, isPending } = useCreateDebriefing(id)
  const afterSubmit = useAfterCaseFormSubmit(id)
  const form = useForm<FormValues>({
    defaultValues: {
      violation: "",
      theme: "",
      nuisance_detected: false,
      feedback: "",
    },
  })
  const violation = useWatch({ control: form.control, name: "violation" })
  const toOtherTheme = violation === SEND_TO_OTHER_THEME

  // The other themes, by name: the theme of the case itself is left out.
  const otherThemes = [
    EXTRA_THEME,
    ...(themes?.results ?? []).map(({ name }) => name),
  ]
    .filter((name) => name !== themeName)
    .sort((a, b) => a.localeCompare(b))

  const onSubmit = async (values: FormValues) => {
    try {
      await createDebriefing({
        case: id,
        case_user_task_id: caseUserTaskId,
        violation: values.violation,
        ...(toOtherTheme && { violation_result: { theme: values.theme } }),
        nuisance_detected: values.nuisance_detected,
        feedback: values.feedback,
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
      title="Debrief terugkoppeling geven"
      form={form}
      onSubmit={onSubmit}
      submitText="Terugkoppeling toevoegen"
      isPending={isPending}
    >
      <RadioControl<FormValues>
        name="violation"
        label={
          themeName === "Goed verhuurderschap"
            ? "Wat is de uitkomst van het debriefen?"
            : "Wat is de uitkomst van het bezoek?"
        }
        options={(violationTypes?.results ?? []).map(({ key, value }) => ({
          label: value,
          value: key,
        }))}
        registerOptions={{ required: "Kies een uitkomst." }}
      />
      <ViolationHelp />
      {toOtherTheme && (
        <SelectControl<FormValues>
          name="theme"
          label="Naar welk thema overdragen?"
          options={[
            { label: "Maak een keuze", value: "" },
            ...otherThemes.map((name) => ({ label: name, value: name })),
          ]}
          registerOptions={{ required: "Kies een thema." }}
        />
      )}
      {themeName === "Vakantieverhuur" && (
        <CheckboxControl<FormValues>
          name="nuisance_detected"
          label="Overlast geconstateerd"
          description="Vink aan als er overlast is geconstateerd, zoals geluid, lawaai, stank en vuil."
        />
      )}
      <TextAreaControl<FormValues>
        name="feedback"
        label="Korte toelichting"
        rows={4}
        registerOptions={{ required: "Vul een toelichting in." }}
      />
    </CaseFormPage>
  )
}

export default DebriefCreateForm
