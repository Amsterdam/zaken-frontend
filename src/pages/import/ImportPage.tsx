import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router"
import {
  Alert,
  Button,
  Column,
  Grid,
  Heading,
  Paragraph,
} from "@amsterdam/design-system-react"
import {
  useImportLeegstandFile,
  type ProcessedCaseResult,
  useValidateLeegstandFile,
} from "@/api/hooks"
import type { ApiError } from "@/api/types/apiError"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import "./ImportPage.css"

const getErrorMessage = (error: unknown) => {
  const apiError = error as (ApiError & { error?: unknown }) | undefined
  if (
    (apiError?.status === 400 || apiError?.status === 500) &&
    typeof apiError.error === "string" &&
    apiError.error
  ) {
    return apiError.error
  }

  return apiError?.detail || apiError?.message || "Uploaden is niet gelukt."
}

const countFailedCases = (processedCases: ProcessedCaseResult[]) =>
  processedCases.filter((caseResult) => !caseResult.success).length

const ImportPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedFileName, setUploadedFileName] = useState<string>()
  const validateFile = useValidateLeegstandFile()
  const importFile = useImportLeegstandFile()
  const processedCases = validateFile.data?.case_data ?? []
  const failedCasesCount = countFailedCases(processedCases)
  const succeededCasesCount = processedCases.length - failedCasesCount
  const canImport = validateFile.isSuccess && succeededCasesCount > 0

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setSelectedFile(file)
    setUploadedFileName(undefined)
    validateFile.reset()
    importFile.reset()
  }

  const onValidate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedFile) return

    const fileToUpload = selectedFile
    validateFile.mutate(fileToUpload, {
      onSuccess: () => {
        setUploadedFileName(fileToUpload.name)
        importFile.reset()
      },
    })
  }

  const onImport = () => {
    if (!selectedFile || !canImport) return
    importFile.mutate(selectedFile, {
      onSuccess: ({ task_id }) => {
        navigate(`/import/${task_id}`)
      },
    })
  }

  return (
    <DefaultLayout>
      <Grid.Cell span="all" appearance="transparent">
        <Heading level={1}>Import</Heading>
      </Grid.Cell>
      <Grid.Cell span="all">
        <Column gap="large">
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
                {validateFile.isPending ? "Bestand valideren..." : "Bestand valideren"}
              </Button>
              {canImport && (
                <Button
                  type="button"
                  onClick={onImport}
                  disabled={importFile.isPending || validateFile.isPending}
                  aria-busy={importFile.isPending}
                >
                  {importFile.isPending ? "Bestand importeren..." : "Bestand importeren"}
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



