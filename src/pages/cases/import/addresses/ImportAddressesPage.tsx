import { useForm } from "react-hook-form"
import { Navigate, useLocation, useNavigate } from "react-router"
import {
  Alert,
  Column,
  Heading,
  Paragraph,
} from "@amsterdam/design-system-react"
import { FileInputControl } from "@amsterdam/ee-ads-rhf"
import { useCaseThemes, useValidateBulkImportFile } from "@/api/hooks"
import { FormPage } from "@/components/FormPage/FormPage"
import { getErrorMessage } from "@/pages/cases/import/getErrorMessage"
import type { ImportLocationState } from "@/pages/cases/import/importFlow"
import { ImportErrorsTable } from "@/pages/cases/import/ImportErrorsTable"

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

const NO_GOOD_ADDRESS =
  "Geen van de adressen is goed. Pas het bestand aan en kies het opnieuw."

const checkFailed = (error: unknown) =>
  `Controleren is niet gelukt: ${getErrorMessage(error)}`

/**
 * Step 2 of importing cases: the Excel file with the addresses. Choosing it
 * checks the addresses at once (a dry run: nothing is saved yet), so you see
 * which ones can get a case before you go on.
 */
const ImportAddressesPage: React.FC = () => {
  const navigate = useNavigate()
  const state = useLocation().state as ImportLocationState | null
  const { data: themes } = useCaseThemes()
  const check = useValidateBulkImportFile()
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

  // A problem with the file is said at the field only (and, after "Volgende
  // stap", in the list above the form that links to it): once, not also in
  // an Alert. It shows as soon as the check is done, before you go on.
  // FileInputControl passes on the files as the value of the field.
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
    check.mutate(
      { file, caseData },
      {
        onSuccess: ({ case_data }) => {
          if (!case_data.some(({ success }) => success))
            form.setError("file", { message: NO_GOOD_ADDRESS })
        },
        onError: (error) =>
          form.setError("file", { message: checkFailed(error) }),
      },
    )
  }

  const validateFile = (files: FileList | null) => {
    if (!files?.length) return true // "required" says so
    if (!isExcelFile(files[0])) return NOT_EXCEL
    if (check.isPending) return "Wacht tot de adressen gecontroleerd zijn."
    if (check.isError) return checkFailed(check.error)
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

  const onPrevious = () => {
    const previous: ImportLocationState = { caseData }
    navigate("/zaken/importeren", { state: previous })
  }

  return (
    <FormPage<FormValues>
      // The task, the same on every step; the step is the heading below.
      title="Zaken importeren"
      form={form}
      onSubmit={onSubmit}
      submitText="Volgende stap"
      onCancel={onPrevious}
      cancelText="Vorige stap"
      // The table of the addresses with errors takes the full width.
      span={{ narrow: 4, medium: 8, wide: 9 }}
      summary={
        <Column gap="small">
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

      {check.isPending && (
        <Paragraph>De adressen worden gecontroleerd…</Paragraph>
      )}

      {/* Only when some are good: when none are, the error is at the field. */}
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

      {check.isSuccess && failed.length === 0 && (
        <Paragraph>
          Alle {results.length} adressen zijn gecontroleerd en zonder fouten.
          Voor elk adres kan een zaak worden aangemaakt.
        </Paragraph>
      )}

      {failed.length > 0 && <ImportErrorsTable failed={failed} />}
    </FormPage>
  )
}

export default ImportAddressesPage
