import dayjs from "dayjs"
import { useForm, useWatch } from "react-hook-form"
import {
  DateControl,
  RadioControl,
  SelectControl,
  TextAreaControl,
} from "@amsterdam/ee-ads-rhf"
import { useCase, useCreateSchedule, useScheduleTypes } from "@/api/hooks"
import { CaseFormPage } from "app/components/case/CaseFormPage/CaseFormPage"
import { useAfterCaseFormSubmit } from "../useAfterCaseFormSubmit"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
}

type Option = { id: number; name: string }

type FormValues = {
  week_segment: string
  day_segment: string
  visit_from: "" | typeof FROM_TODAY | typeof FROM_DATE
  visit_from_date: string
  priority: string
  description: string
}

// From when the visit can be made.
const FROM_TODAY = "today"
const FROM_DATE = "date"
// The value of a date field.
const DATE_FORMAT = "YYYY-MM-DD"

const emptyValues: FormValues = {
  week_segment: "",
  day_segment: "",
  visit_from: "",
  visit_from_date: "",
  priority: "",
  description: "",
}

const toOptions = (options: Option[] = []) => [
  { label: "Maak een keuze", value: "" },
  ...options.map(({ id, name }) => ({ label: name, value: String(id) })),
]

const idByName = (options: Option[], name: string) => {
  const option = options.find((option) => option.name === name)
  return option ? String(option.id) : ""
}

/** The page to plan the visit of a case: when it can be made, and how urgent. */
const ScheduleForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const { data: caseItem } = useCase(id)
  const { data: scheduleTypes } = useScheduleTypes(caseItem?.theme.id)
  const { mutateAsync: createSchedule, isPending } = useCreateSchedule(id)
  const afterSubmit = useAfterCaseFormSubmit(id)
  const today = dayjs().format(DATE_FORMAT)

  // A case of the theme Ondermijning starts with its usual planning filled in.
  const usualValues: FormValues | undefined =
    caseItem?.theme.name === "Ondermijning" && scheduleTypes
      ? {
          ...emptyValues,
          week_segment: idByName(scheduleTypes.week_segments, "Doordeweeks"),
          day_segment: idByName(scheduleTypes.day_segments, "Overdag"),
          visit_from: FROM_TODAY,
          priority: idByName(scheduleTypes.priorities, "Machtiging"),
        }
      : undefined
  const form = useForm<FormValues>({
    defaultValues: emptyValues,
    // Filled in once the case and the choices are loaded; what was already
    // changed by then stays.
    values: usualValues,
    resetOptions: { keepDirtyValues: true },
  })
  const visitFrom = useWatch({ control: form.control, name: "visit_from" })

  const onSubmit = async (values: FormValues) => {
    // The kind of visit: a theme has one.
    const action = scheduleTypes?.actions[0]?.id
    if (action === undefined) return

    try {
      await createSchedule({
        case: id,
        case_user_task_id: caseUserTaskId,
        action,
        week_segment: Number(values.week_segment),
        day_segment: Number(values.day_segment),
        priority: Number(values.priority),
        visit_from_datetime:
          values.visit_from === FROM_DATE
            ? dayjs(values.visit_from_date).format()
            : null,
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
      title="Bezoek inplannen"
      form={form}
      onSubmit={onSubmit}
      submitText="Bezoek inplannen"
      isPending={isPending}
    >
      <SelectControl<FormValues>
        name="week_segment"
        label="Op welke dagen kan het bezoek het beste worden ingepland?"
        options={toOptions(scheduleTypes?.week_segments)}
        registerOptions={{ required: "Kies de dagen." }}
      />
      <SelectControl<FormValues>
        name="day_segment"
        label="Tijdens welk dagdeel kan het bezoek het beste worden ingepland?"
        options={toOptions(scheduleTypes?.day_segments)}
        registerOptions={{ required: "Kies een dagdeel." }}
      />
      <RadioControl<FormValues>
        name="visit_from"
        label="Wanneer kan het bezoek het beste gelopen worden?"
        options={[
          { label: "Vanaf vandaag", value: FROM_TODAY },
          { label: "Vanaf een specifieke datum", value: FROM_DATE },
        ]}
        registerOptions={{
          required: "Kies vanaf wanneer het bezoek gelopen kan worden.",
          // A date to start from, as in the dialog that changes the planning.
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            if (
              event.target.value === FROM_DATE &&
              !form.getValues("visit_from_date")
            ) {
              form.setValue("visit_from_date", today)
            }
          },
        }}
      />
      <DateControl<FormValues>
        name="visit_from_date"
        label="Vanaf welke datum kan het bezoek ingepland worden?"
        min={today}
        registerOptions={{
          required: "Vul een datum in.",
          validate: (date) =>
            date >= today || "Kies vandaag of een dag in de toekomst.",
        }}
        shouldShow={visitFrom === FROM_DATE}
      />
      <SelectControl<FormValues>
        name="priority"
        label="Wat is de urgentie voor het bezoek?"
        description="Kies een hoge urgentie als er nu toeristen aanwezig zijn; kies machtiging als het bezoek voorrang krijgt vanwege een machtiging."
        options={toOptions(scheduleTypes?.priorities)}
        registerOptions={{ required: "Kies een urgentie." }}
      />
      <TextAreaControl<FormValues>
        name="description"
        label="Korte toelichting"
        rows={4}
      />
    </CaseFormPage>
  )
}

export default ScheduleForm
