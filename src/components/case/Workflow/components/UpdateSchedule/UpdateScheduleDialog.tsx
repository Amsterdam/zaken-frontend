import dayjs from "dayjs"
import { useForm, useWatch } from "react-hook-form"
import { Column } from "@amsterdam/design-system-react"
import { DateControl, RadioControl, SelectControl } from "@amsterdam/ee-ads-rhf"
import { type CaseSchedule, useUpdateSchedule } from "@/api/hooks"
import { FormDialog } from "@/components/FormDialog/FormDialog"
import { useToast } from "@/components/toasts/useToast"
import styles from "./UpdateScheduleDialog.module.css"

type Option = { id: number; name: string }

type Props = {
  caseId: components["schemas"]["CaseDetail"]["id"]
  schedule: CaseSchedule
  scheduleTypes: components["schemas"]["ThemeScheduleTypes"]
  onClose: () => void
}

type FormValues = {
  week_segment: string
  day_segment: string
  visit_from: typeof FROM_TODAY | typeof FROM_DATE
  visit_from_date: string
  priority: string
}

// From when the visit can be made.
const FROM_TODAY = "today"
const FROM_DATE = "date"
// The value of a date field.
const DATE_FORMAT = "YYYY-MM-DD"

const toOptions = (options: Option[]) =>
  options.map(({ id, name }) => ({ label: name, value: String(id) }))

/**
 * Changes the planning of the visit of a case (when it can best be made and
 * how urgent it is), in a dialog. Render it while it is open.
 */
const UpdateScheduleDialog: React.FC<Props> = ({
  caseId,
  schedule,
  scheduleTypes,
  onClose,
}) => {
  const { mutateAsync: updateSchedule, isPending } = useUpdateSchedule(
    schedule.id,
    caseId,
  )
  const { showToast } = useToast()
  const currentDate = schedule.visit_from_datetime
    ? dayjs(schedule.visit_from_datetime).format(DATE_FORMAT)
    : ""
  const today = dayjs().format(DATE_FORMAT)
  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      week_segment: String(schedule.week_segment),
      day_segment: String(schedule.day_segment),
      visit_from: currentDate ? FROM_DATE : FROM_TODAY,
      visit_from_date: currentDate,
      priority: String(schedule.priority.id),
    },
  })
  const visitFrom = useWatch({ control: form.control, name: "visit_from" })

  const onSubmit = async (values: FormValues) => {
    // The options with their names: the hook shows them without a refetch.
    const find = (options: Option[], id: string) =>
      options.find((option) => String(option.id) === id)
    const week_segment = find(scheduleTypes.week_segments, values.week_segment)
    const day_segment = find(scheduleTypes.day_segments, values.day_segment)
    const priority = find(scheduleTypes.priorities, values.priority)
    if (!week_segment || !day_segment || !priority) return

    try {
      await updateSchedule({
        week_segment,
        day_segment,
        priority,
        visit_from_datetime:
          values.visit_from === FROM_DATE
            ? dayjs(values.visit_from_date).format()
            : null,
      })
    } catch {
      // The error is shown as a toast; the dialog stays.
      return
    }
    showToast({
      severity: "success",
      title: "Planning gewijzigd",
      // The urgency is what the table shows: named when it changed.
      description:
        priority.id === schedule.priority.id ? (
          "De planning van het bezoek is aangepast."
        ) : (
          <>
            De planning van het bezoek is aangepast. De urgentie is nu{" "}
            <strong>{priority.name}</strong>.
          </>
        ),
    })
    onClose()
  }

  return (
    <FormDialog
      heading="Planning bezoek wijzigen"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      onClose={onClose}
    >
      <Column>
        {/* First the urgency: that is where the button to this dialog is. */}
        <SelectControl<FormValues>
          name="priority"
          label="Wat is de urgentie voor het bezoek?"
          options={toOptions(scheduleTypes.priorities)}
          registerOptions={{ required: "Kies een urgentie." }}
          className={styles.select}
          // The dialog has its own heading: the questions are no second one.
          inFieldSet
        />
        <SelectControl<FormValues>
          name="week_segment"
          label="Op welke dagen kan het bezoek het beste worden ingepland?"
          options={toOptions(scheduleTypes.week_segments)}
          registerOptions={{ required: "Kies de dagen." }}
          className={styles.select}
          inFieldSet
        />
        <SelectControl<FormValues>
          name="day_segment"
          label="Tijdens welk dagdeel kan het bezoek het beste worden ingepland?"
          options={toOptions(scheduleTypes.day_segments)}
          registerOptions={{ required: "Kies een dagdeel." }}
          className={styles.select}
          inFieldSet
        />
        <RadioControl<FormValues>
          name="visit_from"
          label="Wanneer kan het bezoek het beste gelopen worden?"
          options={[
            { label: "Vanaf vandaag", value: FROM_TODAY },
            { label: "Vanaf een specifieke datum", value: FROM_DATE },
          ]}
          registerOptions={{
            required: "Maak een keuze.",
            // A date to start from, so there is something to save right away.
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
              if (
                event.target.value === FROM_DATE &&
                !form.getValues("visit_from_date")
              ) {
                form.setValue("visit_from_date", today, {
                  shouldValidate: true,
                })
              }
            },
          }}
          inFieldSet
        />
        <DateControl<FormValues>
          name="visit_from_date"
          label="Vanaf welke datum kan het bezoek ingepland worden?"
          min={today}
          registerOptions={{
            required: "Vul een datum in.",
            validate: (date) =>
              date === currentDate ||
              date >= today ||
              "Kies vandaag of een dag in de toekomst.",
          }}
          inFieldSet
          shouldShow={visitFrom === FROM_DATE}
        />
      </Column>
    </FormDialog>
  )
}

export default UpdateScheduleDialog
