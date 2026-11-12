import { useState, type ChangeEvent, type FormEvent } from "react"
import { useLocation, useNavigate } from "react-router"
import {
  Alert,
  Button,
  Column,
  Grid,
  Heading,
  Paragraph,
} from "@amsterdam/design-system-react"
import {
  useImportBulkImportFile,
  type ProcessedCaseResult,
  useValidateBulkImportFile,
} from "@/api/hooks"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import { getErrorMessage } from "@/pages/import/getErrorMessage"
import type { ImportValidationLocationState } from "@/pages/import/importFlow"
import "./ImportPage.css"

const countFailedCases = (processedCases: ProcessedCaseResult[]) =>
  processedCases.filter((caseResult) => !caseResult.success).length

const ImportPage: React.FC = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const importState = state as ImportValidationLocationState | undefined
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
    if (!selectedFile || !importState?.templateCase) return

    const fileToUpload = selectedFile
    validateFile.mutate(
      {
        file: fileToUpload,
        templateCase: importState.templateCase,
      },
      {
      onSuccess: () => {
        setUploadedFileName(fileToUpload.name)
      },
      },
    )
  }

  const onImport = () => {
    if (!selectedFile || !canImport || !importState?.templateCase) return
    importFile.mutate(
      {
        file: selectedFile,
        templateCase: importState.templateCase,
      },
      {
        onSuccess: ({ task_id }) => {
          navigate(`/import/${task_id}`)
        },
      },
    )
  }

  if (!importState?.templateCase) {
    return (
      <DefaultLayout>
        <Grid.Cell span="all" appearance="transparent">
          <Heading level={1}>Import valideren</Heading>
        </Grid.Cell>
        <Grid.Cell span="all">
          <Column gap="large">
            <Paragraph>
              1. Template kiezen {"->"} 2. Valideren {"->"} 3. Importstatus
            </Paragraph>
            <Alert heading="Geen template gekozen" headingLevel={2} severity="error">
              <Paragraph>Kies eerst een zaaktemplate om de import te starten.</Paragraph>
            </Alert>
            <Button type="button" onClick={() => navigate("/import")}>Naar template kiezen</Button>
          </Column>
        </Grid.Cell>
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout>
      <Grid.Cell span="all" appearance="transparent">
        <Heading level={1}>Import valideren</Heading>
      </Grid.Cell>
      <Grid.Cell span="all">
        <Column gap="large">
          <Paragraph>
            1. Template kiezen {"->"} 2. Valideren {"->"} 3. Importstatus
          </Paragraph>
          <Paragraph>
            Upload een bestand om het door de backend te laten verwerken via
            process_leegstand_file.
          </Paragraph>
          {validateFile.isSuccess && uploadedFileName && (
            <Alert heading="Validatie gereed" headingLevel={2} severity="success">
              <Paragraph>
                Het bestand {uploadedFileName} is gevalideerd.
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
            <Alert heading="Uploaden is niet gelukt" headingLevel={2} severity="error">
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
                  ? "Stap 2: bestand valideren..."
                  : "Stap 2: bestand valideren"}
              </Button>
              {canImport && (
                <Button
                  type="button"
                  onClick={onImport}
                  disabled={validateFile.isPending || importFile.isPending}
                  aria-busy={importFile.isPending}
                >
                  {importFile.isPending
                    ? "Stap 2 afronden: bestand importeren..."
                    : "Stap 2 afronden: bestand importeren"}
                </Button>
              )}
            </Column>
          </form>
        </Column>
      </Grid.Cell>
    </DefaultLayout>
  )
}

export default ImportPage



