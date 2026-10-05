import dayjs from "dayjs"
import { useForm } from "react-hook-form"
import { Alert, Paragraph } from "@amsterdam/design-system-react"
import {
  CheckboxControlGroup,
  DateControl,
  RadioControl,
  SelectControl,
  TextAreaControl,
} from "@amsterdam/ee-ads-rhf"
import { useCreateVisit, useUsers } from "@/api/hooks"
import { CaseFormPage } from "@/app/components/case/CaseFormPage/CaseFormPage"
import { useAfterCaseFormSubmit } from "../useAfterCaseFormSubmit"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
}

type FormValues = {
  author1: string
  author2: string
  start_time: string
  situation: string
  observations: string[]
  can_next_visit_go_ahead: "" | typeof YES | typeof NO
  can_next_visit_go_ahead_description: string
  suggest_next_visit: string
  suggest_next_visit_description: string
  notes: string
}

const YES = "yes"
const NO = "no"
// The value of a field for a date and a time.
const DATE_TIME_FORMAT = "YYYY-MM-DDTHH:mm"
// A visit made here did not come from the TOP app: the id the backend asks
// for is a made-up one, as it always was in this form.
const TOP_VISIT_ID = 42

/** The text when there is one, else the field is left out. */
const optional = <Key extends string>(key: Key, value: string) =>
  (value.trim() !== "" ? { [key]: value } : {}) as { [K in Key]?: string }

/**
 * The page to add the result of a visit by hand. Visits are processed in the
 * TOP app; this form is there for when that did not work.
 */
const VisitForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const { data: users } = useUsers()
  const { mutateAsync: createVisit, isPending } = useCreateVisit(id)
  const afterSubmit = useAfterCaseFormSubmit(id)
  const form = useForm<FormValues>({
    defaultValues: {
      author1: "",
      author2: "",
      start_time: dayjs().format(DATE_TIME_FORMAT),
      situation: "",
      observations: [],
      can_next_visit_go_ahead: "",
      can_next_visit_go_ahead_description: "",
      suggest_next_visit: "",
      suggest_next_visit_description: "",
      notes: "",
    },
  })

  const authors = [
    { label: "Maak een keuze", value: "" },
    ...(users?.results ?? []).flatMap(({ id, full_name }) =>
      id ? [{ label: full_name ?? id, value: id }] : [],
    ),
  ]

  const onSubmit = async (values: FormValues) => {
    try {
      await createVisit({
        case: id,
        task: caseUserTaskId,
        top_visit_id: TOP_VISIT_ID,
        completed: true,
        author_ids: [values.author1, values.author2],
        start_time: values.start_time,
        situation: values.situation,
        observations: values.observations,
        ...(values.can_next_visit_go_ahead !== "" && {
          can_next_visit_go_ahead: values.can_next_visit_go_ahead === YES,
        }),
        ...optional(
          "can_next_visit_go_ahead_description",
          values.can_next_visit_go_ahead_description,
        ),
        ...optional("suggest_next_visit", values.suggest_next_visit),
        ...optional(
          "suggest_next_visit_description",
          values.suggest_next_visit_description,
        ),
        ...optional("notes", values.notes),
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
      title="Resultaat bezoek"
      form={form}
      onSubmit={onSubmit}
      submitText="Toevoegen"
      isPending={isPending}
      intro={
        <Alert
          severity="warning"
          heading="Dit formulier niet gebruiken"
          headingLevel={2}
        >
          <Paragraph>
            Het bezoek wordt door de toezichthouder in de TOP app verwerkt,
            waarna deze taak automatisch wordt opgepakt.
          </Paragraph>
        </Alert>
      }
    >
      <SelectControl<FormValues>
        name="author1"
        label="Toezichthouder 1"
        options={authors}
        registerOptions={{ required: "Kies toezichthouder 1." }}
      />
      <SelectControl<FormValues>
        name="author2"
        label="Toezichthouder 2"
        options={authors}
        registerOptions={{
          required: "Kies toezichthouder 2.",
          validate: (author2, { author1 }) =>
            author2 !== author1 || "Kies twee verschillende toezichthouders.",
        }}
      />
      <DateControl<FormValues>
        name="start_time"
        label="Starttijd onderzoek"
        type="datetime-local"
        registerOptions={{ required: "Vul de starttijd van het onderzoek in." }}
      />
      <RadioControl<FormValues>
        name="situation"
        label="Welke situatie is van toepassing?"
        options={[
          { label: "Niemand aanwezig", value: "nobody_present" },
          { label: "Geen medewerking", value: "no_cooperation" },
          { label: "Toegang verleend", value: "access_granted" },
        ]}
        registerOptions={{ required: "Kies een situatie." }}
      />
      <CheckboxControlGroup<FormValues>
        name="observations"
        label="Opvallende zaken"
        options={[
          { label: "Bel functioneert niet", value: "malfunctioning_doorbell" },
          { label: "Contact via intercom", value: "intercom" },
          { label: "Hotelmatig ingericht", value: "hotel_furnished" },
          { label: "Leegstand", value: "vacant" },
          { label: "Vermoedelijk bewoond", value: "likely_inhabited" },
        ]}
      />
      <RadioControl<FormValues>
        name="can_next_visit_go_ahead"
        label="Kan het adres direct worden uitgezet?"
        options={[
          { label: "Ja, doorlaten", value: YES },
          { label: "Nee, tegenhouden", value: NO },
        ]}
      />
      <TextAreaControl<FormValues>
        name="can_next_visit_go_ahead_description"
        label="Toelichting bij het uitzetten"
        rows={3}
      />
      <RadioControl<FormValues>
        name="suggest_next_visit"
        label="Suggestie nieuw bezoek"
        options={[
          { label: "Overdag", value: "daytime" },
          { label: "Weekend", value: "weekend" },
          { label: "’s Avonds", value: "evening" },
          { label: "Niet meer uitzetten", value: "unknown" },
        ]}
      />
      <TextAreaControl<FormValues>
        name="suggest_next_visit_description"
        label="Toelichting bij de suggestie"
        rows={3}
      />
      <TextAreaControl<FormValues> name="notes" label="Opmerkingen" rows={4} />
    </CaseFormPage>
  )
}

export default VisitForm
