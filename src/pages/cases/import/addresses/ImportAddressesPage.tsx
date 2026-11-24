import { useForm } from "react-hook-form"
import { Navigate, useLocation, useNavigate } from "react-router"
import {
  Alert,
  Column,
  Heading,
  Paragraph,
  Skeleton,
} from "@amsterdam/design-system-react"
import { FileInputControl } from "@amsterdam/ee-ads-rhf"
import { useCaseThemes, useCheckImportFile } from "@/api/hooks"
import { FormPage } from "@/components/FormPage/FormPage"
import { ExampleFileLink } from "@/pages/cases/import/ExampleFileLink"
import { getErrorMessage } from "@/pages/cases/import/getErrorMessage"
import type { ImportLocationState } from "@/pages/cases/import/importLocationState"
import { ImportErrorsTable } from "@/pages/cases/import/ImportErrorsTable"
import { PreviousStepLink } from "@/pages/cases/import/PreviousStepLink"

type FormValues = {
  file: FileList | null
}

// The backend reads .xlsx (openpyxl), not the old .xls. The extension, as not
// every system gives an Excel file its MIME type.
const EXCEL_EXTENSION = ".xlsx"
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
const isExcelFile = (file: File) =>
  file.name.toLowerCase().endsWith(EXCEL_EXTENSION)
const NOT_EXCEL = "Kies een Excel-bestand (.xlsx)."

// After "Volgende stap", at the field: what to do. What went wrong is said in
// the Alert below the field as soon as the check is done.
const NO_GOOD_ADDRESS = "Kies een bestand met ten minste één goed adres."
const CHECK_FAILED = "Kies het bestand opnieuw om de adressen te controleren."

/**
 * Step 2 of importing cases: the Excel file with the addresses. Choosing it
 * checks the addresses at once (a dry run: nothing is saved yet), so you see
 * which ones can get a case before you go on.
 */
const ImportAddressesPage: React.FC = () => {
  const navigate = useNavigate()
  const state = useLocation().state as ImportLocationState | null
  const { data: themes } = useCaseThemes()
  const check = useCheckImportFile()
  const form = useForm<FormValues>({ defaultValues: { file: null } })

  // Without a theme (e.g. a link to this page) you start at step 1.
  if (!state?.caseData) return <Navigate to="/zaken/importeren" replace />
  const { caseData } = state

  const themeName = themes?.results.find(
    ({ id }) => id === caseData.themeId,
  )?.name
  const results = check.data?.case_data ?? []
  const failed = results.filter(({ success }) => !success)
  const succeededCount = results.length - failed.length

  // The outcome of the check (all good, some, none, or failed) is an Alert
  // below the field. Only a file that is not Excel (never checked) is an error
  // at the field at once. FileInputControl passes on the files as the value
  // of the field.
  const onFileChange = (event: { target: { value: FileList | null } }) => {
    const file = event.target.value?.[0]
    check.reset()
    form.clearErrors("file")
    if (!file) return
    // Only an Excel file goes to the backend.
    if (!isExcelFile(file)) {
      form.setError("file", { message: NOT_EXCEL })
      return
    }
    check.mutate({ file, caseData })
  }

  const validateFile = (files: FileList | null) => {
    if (!files?.length) return true // "required" says so
    if (!isExcelFile(files[0])) return NOT_EXCEL
    if (check.isError) return CHECK_FAILED
    if (succeededCount === 0) return NO_GOOD_ADDRESS
    return true
  }

  const onSubmit = ({ file }: FormValues) => {
    const next: ImportLocationState = {
      caseData,
      file: file?.[0],
      goodAddressCount: succeededCount,
    }
    navigate("/zaken/importeren/zaakgegevens", { state: next })
  }

  return (
    <FormPage<FormValues>
      // The task, the same on every step; the step is the heading below.
      title="Zaken importeren"
      form={form}
      onSubmit={onSubmit}
      submitText="Volgende stap"
      // Waiting for the check is not a mistake to correct: the button is off.
      isPending={check.isPending}
      pendingText="Bezig met controleren…"
      // The table of the addresses with errors takes the full width.
      span={{ narrow: 4, medium: 8, wide: 9 }}
      summary={
        <Column gap="small">
          <PreviousStepLink to="/zaken/importeren" state={{ caseData }} />
          <Heading level={2}>Stap 2 van 3: Adressen controleren</Heading>
          <Paragraph>
            Kies het Excel-bestand met de adressen
            {themeName && (
              <>
                {" "}
                voor het thema <strong>{themeName}</strong>
              </>
            )}
            . Je ziet meteen voor welke adressen een zaak aangemaakt kan worden.
            Er wordt nog niets opgeslagen.
          </Paragraph>
          <ExampleFileLink />
        </Column>
      }
    >
      <FileInputControl<FormValues>
        name="file"
        label="Excel-bestand"
        // Only a filter of the file picker: you can still choose another file.
        accept={`${EXCEL_EXTENSION},${EXCEL_TYPE}`}
        registerOptions={{
          required: "Kies een Excel-bestand met adressen.",
          onChange: onFileChange,
          validate: validateFile,
        }}
      />

      {/* Always there, so a screen reader reads out the text when it comes:
          the Skeleton is aria-hidden. */}
      <p className="ams-visually-hidden" role="status">
        {check.isPending && "De adressen worden gecontroleerd…"}
      </p>

      {/* The shape of the Alert that usually comes; not the table of errors,
          as it is only there when some addresses are wrong. */}
      {check.isPending && (
        <Skeleton>
          <Skeleton.Heading />
          <Skeleton.Paragraph lines={2} />
        </Skeleton>
      )}

      {check.isError && (
        <Alert
          heading="Controleren is niet gelukt"
          headingLevel={2}
          severity="error"
        >
          <Paragraph>
            {getErrorMessage(check.error)} Pas het bestand aan en probeer het
            opnieuw.
          </Paragraph>
        </Alert>
      )}

      {check.isSuccess && succeededCount === 0 && (
        <Alert
          heading="Geen enkel adres kan geïmporteerd worden"
          headingLevel={2}
          severity="error"
        >
          <Paragraph>
            {results.length === 0
              ? "Er staan geen adressen in het bestand."
              : `Voor geen van de ${results.length} adressen kan een zaak worden aangemaakt. In de tabel hieronder zie je wat er mis is.`}{" "}
            Pas het bestand aan en kies het opnieuw.
          </Paragraph>
        </Alert>
      )}

      {check.isSuccess && failed.length > 0 && succeededCount > 0 && (
        <Alert
          heading="Niet alle adressen kunnen geïmporteerd worden"
          headingLevel={2}
          severity="warning"
        >
          <Paragraph>
            Let op: voor{" "}
            <strong>
              {failed.length} van de {results.length} adressen
            </strong>{" "}
            kan geen zaak worden aangemaakt. In de tabel hieronder zie je wat er
            mis is. Pas het bestand aan en upload het opnieuw. Of ga verder
            zonder deze adressen: dan worden alleen zaken aangemaakt voor de
            adressen zonder fouten.
          </Paragraph>
        </Alert>
      )}

      {/* The outcome of the check, not a saved action (that is a toast): it
          stays while you decide to go on, as the warning above does. */}
      {check.isSuccess && failed.length === 0 && results.length > 0 && (
        <Alert
          heading="Alle adressen kunnen geïmporteerd worden"
          headingLevel={2}
          severity="success"
        >
          <Paragraph>
            Alle {results.length} adressen zijn gecontroleerd en zonder fouten.
            Voor elk adres kan een zaak worden aangemaakt.
          </Paragraph>
        </Alert>
      )}

      {failed.length > 0 && <ImportErrorsTable failed={failed} />}
    </FormPage>
  )
}

export default ImportAddressesPage
