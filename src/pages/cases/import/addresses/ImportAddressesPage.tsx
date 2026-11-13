import { useState, type ChangeEvent, type FormEvent } from "react"
import { useLocation, useNavigate } from "react-router"
import {
  Alert,
  Button,
  Column,
  Grid,
  Paragraph,
} from "@amsterdam/design-system-react"
import {
  useImportBulkImportFile,
  type ProcessedCaseResult,
  useValidateBulkImportFile,
} from "@/api/hooks"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import { PageHeading } from "@/components/PageHeading/PageHeading"
import { getErrorMessage } from "@/pages/cases/import/getErrorMessage"
import type { ImportLocationState } from "@/pages/cases/import/importFlow"
import "./ImportAddressesPage.css"

const countFailedCases = (processedCases: ProcessedCaseResult[]) =>
  processedCases.filter((caseResult) => !caseResult.success).length

const ImportAddressesPage: React.FC = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const importState = state as ImportLocationState | undefined
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedFileName, setUploadedFileName] = useState<string>()
  const validateFile = useValidateBulkImportFile()
  const importFile = useImportBulkImportFile()
  const processedCases = validateFile.data?.case_data ?? []
  const failedCasesCount = countFailedCases(processedCases)
  const succeededCasesCount = processedCases.length - failedCasesCount
  const canImport = validateFile.isSuccess && succeededCasesCount > 0

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setSelectedFile(file)
    setUploadedFileName(undefined)
    validateFile.reset()
  }

  const onValidate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedFile || !importState?.caseData) return

    const fileToUpload = selectedFile
    validateFile.mutate(
      {
        file: fileToUpload,
        caseData: importState.caseData,
      },
      {
      onSuccess: () => {
        setUploadedFileName(fileToUpload.name)
      },
      },
    )
  }

  const onImport = () => {
    if (!selectedFile || !canImport || !importState?.caseData) return
    importFile.mutate(
      {
        file: selectedFile,
        caseData: importState.caseData,
      },
      {
        onSuccess: ({ task_id }) => {
          navigate(`/zaken/importeren/resultaat/${task_id}`)
        },
      },
    )
  }

  if (!importState?.caseData) {
    return (
      <DefaultLayout>
        <PageHeading title="Bestand controleren" />
        <Grid.Cell span="all">
          <Column gap="large">
            <Paragraph>
              1. Soort zaak kiezen → 2. Bestand controleren → 3. Resultaat
            </Paragraph>
            <Alert heading="Geen soort zaak gekozen" headingLevel={2} severity="error">
              <Paragraph>Kies eerst de soort zaak om de import te starten.</Paragraph>
            </Alert>
            <Button type="button" onClick={() => navigate("/zaken/importeren")}>Naar soort zaak kiezen</Button>
          </Column>
        </Grid.Cell>
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout>
      <PageHeading title="Bestand controleren" />
      <Grid.Cell span="all">
        <Column gap="large">
          <Paragraph>
            1. Soort zaak kiezen → 2. Bestand controleren → 3. Resultaat
          </Paragraph>
          <Paragraph>
            Upload het Excel-bestand met de zaken. Na het controleren zie je
            welke zaken je kan importeren.
          </Paragraph>
          {validateFile.isSuccess && uploadedFileName && (
            <Alert heading="Bestand gecontroleerd" headingLevel={2} severity="success">
              <Paragraph>
                Het bestand {uploadedFileName} is gecontroleerd.
              </Paragraph>
              <Paragraph>
                Zaken importeerbaar: {succeededCasesCount} | niet importeerbaar: {failedCasesCount}
              </Paragraph>
              {processedCases.length > 0 && (
                <ul className="import-case-results" aria-label="Importresultaten per zaak">
                  {processedCases.map((caseResult, index) => (
                    <li
                      key={`${index}-${caseResult.msg}`}
                      className={
                        caseResult.success
                          ? "import-case-results__item import-case-results__item--success"
                          : "import-case-results__item import-case-results__item--error"
                      }
                    >
                      {caseResult.msg}
                    </li>
                  ))}
                </ul>
              )}
            </Alert>
          )}
          {validateFile.isError && (
            <Alert heading="Controleren is niet gelukt" headingLevel={2} severity="error">
              <Paragraph>{getErrorMessage(validateFile.error)}</Paragraph>
            </Alert>
          )}
          {importFile.isError && (
            <Alert heading="Importeren is niet gelukt" headingLevel={2} severity="error">
              <Paragraph>{getErrorMessage(importFile.error)}</Paragraph>
            </Alert>
          )}
          <form onSubmit={onValidate}>
            <Column gap="small" alignHorizontal="start">
              <input
                type="file"
                onChange={onFileChange}
                aria-label="Bestand kiezen voor import"
              />
              <Button
                type="submit"
                disabled={!selectedFile || validateFile.isPending || importFile.isPending}
                aria-busy={validateFile.isPending}
              >
                {validateFile.isPending
                  ? "Bestand controleren..."
                  : "Bestand controleren"}
              </Button>
              {canImport && (
                <Button
                  type="button"
                  onClick={onImport}
                  disabled={validateFile.isPending || importFile.isPending}
                  aria-busy={importFile.isPending}
                >
                  {importFile.isPending
                    ? "Zaken importeren..."
                    : "Zaken importeren"}
                </Button>
              )}
            </Column>
          </form>
        </Column>
      </Grid.Cell>
    </DefaultLayout>
  )
}

export default ImportAddressesPage



