import { useForm, useWatch } from "react-hook-form"
import { Navigate, useLocation, useNavigate } from "react-router"
import {
  Alert,
  Column,
  Heading,
  Paragraph,
} from "@amsterdam/design-system-react"
import {
  CheckboxControlGroup,
  RadioControl,
  SelectControl,
  TextAreaControl,
} from "@amsterdam/ee-ads-rhf"
import {
  useAllowedJumpWorkflows,
  useCaseThemes,
  useImportBulkImportFile,
  useProjects,
  useReasons,
  useSubjects,
} from "@/api/hooks"
import { FormPage } from "@/components/FormPage/FormPage"
import { getErrorMessage } from "@/pages/cases/import/getErrorMessage"
import type { ImportLocationState } from "@/pages/cases/import/importFlow"
import {
  REASON_PROJECT,
  REASONS_NOT_FOR_IMPORT,
} from "@/shared/constants/reasonNames"

type FormValues = {
  reason: string
  project: string
  subjects: string[]
  description: string
  jump_to: string
}

// The value of "at the start of the process": no jump_to.
const START = "start"

const toOptions = (options: { id: number; name: string }[] = []) =>
  options.map(({ id, name }) => ({ label: name, value: String(id) }))

/**
 * Step 3 of importing cases: the data for all cases (the reason, the project
 * for the reason "Project", the subjects and an explanation), and whether the
 * cases start further on in the process. Not the form to create one case: what
 * belongs to one address (a housing corporation, advertisements, a report, …)
 * cannot be given for all. Then the cases are made, in the background: the
 * result page follows it.
 */
const ImportCaseDataPage: React.FC = () => {
  const navigate = useNavigate()
  const state = useLocation().state as ImportLocationState | null
  const themeId = state?.caseData.themeId
  const { data: themes } = useCaseThemes()
  const { data: reasons } = useReasons(themeId)
  const { data: projects } = useProjects(themeId)
  const { data: subjects } = useSubjects(themeId)
  const { data: jumpWorkflows } = useAllowedJumpWorkflows()
  const importFile = useImportBulkImportFile()
  const form = useForm<FormValues>({
    defaultValues: {
      reason: "",
      project: "",
      subjects: [],
      description: "",
      jump_to: START,
    },
  })
  const reason = useWatch({ control: form.control, name: "reason" })

  // Without a theme you start at step 1, without a checked file at step 2.
  if (!state?.caseData) return <Navigate to="/zaken/importeren" replace />
  if (!state.file) {
    const previous: ImportLocationState = { caseData: state.caseData }
    return (
      <Navigate to="/zaken/importeren/controleren" state={previous} replace />
    )
  }
  const { caseData, file, goodAddressCount } = state

  const themeName = themes?.results.find(({ id }) => id === themeId)?.name
  // Not the reasons that ask for something of one case (an MMA number, …).
  const reasonOptions = (reasons?.results ?? []).filter(
    ({ name }) => !REASONS_NOT_FOR_IMPORT.includes(name),
  )
  // The steps the cases can start at: some belong to one theme only.
  const startOptions = [
    { label: "Aan het begin van het proces", value: START },
    ...(jumpWorkflows ?? [])
      .filter(
        ({ themes: forThemes }) =>
          forThemes === null ||
          (themeName !== undefined && forThemes.includes(themeName)),
      )
      .map(({ value, label }) => ({ label, value }))
      // The start first, the steps on alphabet.
      .sort((a, b) => a.label.localeCompare(b.label, "nl")),
  ]
  const reasonName = reasonOptions.find(({ id }) => String(id) === reason)?.name

  const onSubmit = (values: FormValues) =>
    importFile.mutate(
      {
        file,
        caseData: {
          ...caseData,
          reasonId: Number(values.reason),
          ...(reasonName === REASON_PROJECT && {
            projectId: Number(values.project),
          }),
          subjectIds: values.subjects.map(Number),
          // Without an explanation the field is left out.
          ...(values.description.trim() !== "" && {
            description: values.description,
          }),
          ...(values.jump_to !== START && { jumpTo: values.jump_to }),
        },
      },
      {
        onSuccess: ({ task_id }) =>
          navigate(`/zaken/importeren/resultaat/${task_id}`),
      },
    )

  // Back to choosing the file: the theme stays chosen.
  const onPrevious = () => {
    const previous: ImportLocationState = { caseData }
    navigate("/zaken/importeren/controleren", { state: previous })
  }

  return (
    <FormPage<FormValues>
      title="Zaken importeren"
      form={form}
      onSubmit={onSubmit}
      submitText="Zaken importeren"
      isPending={importFile.isPending}
      onCancel={onPrevious}
      cancelText="Vorige stap"
      summary={
        <Column gap="small">
          <Heading level={2}>
            Stap 3 van 3: Zaakgegevens kiezen en importeren
          </Heading>
          <Paragraph>
            Er worden zaken aangemaakt
            {goodAddressCount !== undefined && (
              <>
                {" "}
                voor <strong>{goodAddressCount} adressen</strong>
              </>
            )}{" "}
            uit het bestand <strong>{file.name}</strong>
            {themeName && (
              <>
                , met het thema <strong>{themeName}</strong>
              </>
            )}
            . Kies de gegevens die voor al deze zaken gelden.
          </Paragraph>
        </Column>
      }
    >
      <RadioControl<FormValues>
        name="reason"
        label="Aanleiding"
        options={toOptions(reasonOptions)}
        registerOptions={{ required: "Kies een aanleiding." }}
      />
      <SelectControl<FormValues>
        name="project"
        label="Projectnaam"
        options={[
          { label: "Maak een keuze", value: "" },
          ...toOptions(projects?.results),
        ]}
        registerOptions={{ required: "Kies een project." }}
        shouldShow={reasonName === REASON_PROJECT}
      />
      <CheckboxControlGroup<FormValues>
        name="subjects"
        label="Onderwerp(en)"
        options={toOptions(subjects?.results)}
        registerOptions={{ required: "Kies ten minste één onderwerp." }}
      />
      <RadioControl<FormValues>
        name="jump_to"
        label="Waar beginnen de zaken?"
        description="Nieuwe zaken beginnen standaard bij de eerste stap, zoals het huisbezoek. Je kunt ook kiezen om stappen over te slaan en de zaken later in het proces te laten beginnen, bijvoorbeeld bij de debrief of de aanschrijving."
        options={startOptions}
        registerOptions={{ required: "Kies waar de zaken beginnen." }}
      />
      <TextAreaControl<FormValues>
        name="description"
        label="Korte toelichting"
        description="Komt bij elke zaak, boven de toelichting uit het bestand."
        rows={4}
      />

      {importFile.isError && (
        <Alert
          heading="Importeren is niet gelukt"
          headingLevel={2}
          severity="error"
        >
          <Paragraph>{getErrorMessage(importFile.error)}</Paragraph>
        </Alert>
      )}
    </FormPage>
  )
}

export default ImportCaseDataPage
