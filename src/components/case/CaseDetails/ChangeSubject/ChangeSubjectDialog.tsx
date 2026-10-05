import { useForm, useWatch } from "react-hook-form"
import { Column } from "@amsterdam/design-system-react"
import { ReactSelectControl, SelectControl } from "@amsterdam/ee-ads-rhf"
import { useCaseThemes, useSubjects, useUpdateCase } from "@/api/hooks"
import { FormDialog } from "@/components/FormDialog/FormDialog"
import { useToast } from "@/components/toasts/useToast"

type Subject = components["schemas"]["Subject"]
type Option = { label: string; value: string }

type Props = {
  caseId: components["schemas"]["CaseCreate"]["id"]
  themeId: components["schemas"]["CaseTheme"]["id"]
  subjects: Subject[]
  onClose: () => void
}

type FormValues = {
  /** The theme whose subjects are in the list; starts as the case's theme. */
  theme: string
  subjects: Option[]
}

const toOption = ({ id, name }: Subject): Option => ({
  label: name,
  value: String(id),
})

/**
 * Changes the subjects of a case, in a dialog. The list has the subjects of
 * the theme of the case; choosing another theme shows the subjects of that
 * theme, to add to the ones already chosen. Render it while it is open.
 */
const ChangeSubjectDialog: React.FC<Props> = ({
  caseId,
  themeId,
  subjects,
  onClose,
}) => {
  const { showToast } = useToast()
  const { mutateAsync: updateCase, isPending } = useUpdateCase(caseId)
  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      theme: String(themeId),
      subjects: subjects.map(toOption),
    },
  })
  const theme = useWatch({ control: form.control, name: "theme" })

  const { data: themes } = useCaseThemes()
  const { data: themeSubjects } = useSubjects(Number(theme))

  const onSubmit = async ({ subjects }: FormValues) => {
    try {
      await updateCase({
        subject_ids: subjects.map(({ value }) => Number(value)),
      })
    } catch {
      // The error is shown as a toast; the dialog stays.
      return
    }
    showToast({
      severity: "success",
      title: "Onderwerpen gewijzigd",
      description:
        subjects.length > 0 ? (
          <>
            De zaak heeft de volgende onderwerpen gekregen:{" "}
            <strong>{subjects.map(({ label }) => label).join(", ")}</strong>.
          </>
        ) : (
          "De zaak heeft geen onderwerp meer."
        ),
    })
    onClose()
  }

  return (
    <FormDialog
      heading="Onderwerpen wijzigen"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      onClose={onClose}
    >
      <Column>
        {/* First the theme, then its subjects: the theme decides what is in the list. */}
        <SelectControl<FormValues>
          name="theme"
          label="Thema"
          description="Kies een thema om onderwerpen toe te voegen. De huidige selectie blijft behouden."
          options={(themes?.results ?? []).map(({ id, name }) => ({
            label: id === themeId ? `${name} (thema van deze zaak)` : name,
            value: String(id),
          }))}
          registerOptions={{ required: "Kies een thema." }}
          // The dialog has its own heading: the labels are no second one.
          inFieldSet
        />
        <ReactSelectControl<FormValues>
          name="subjects"
          label="Onderwerpen"
          description="Je kunt onderwerpen uit meerdere thema's selecteren."
          options={(themeSubjects?.results ?? []).map(toOption)}
          isMulti
          // A case may have no subject; this only hides "(niet verplicht)".
          required
          inFieldSet
          inputProps={{
            placeholder: "Selecteer één of meer onderwerpen",
            // In a modal dialog the list must stay inside the dialog (a list
            // in the page's body would lie behind it), and may stick out of it.
            menuPortalTarget: null,
            menuPosition: "fixed",
          }}
        />
      </Column>
    </FormDialog>
  )
}

export default ChangeSubjectDialog
