import { Alert, Grid, Heading, Paragraph } from "@amsterdam/design-system-react"
import { useParams } from "react-router"
import { type ProcessedCaseResult, useBulkImportFileStatus } from "@/api/hooks"
import type { ApiError } from "@/api/types/apiError"
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout"
import { AmsterdamCrossSpinner } from "@/components/spinners/AmsterdamCrossSpinner/AmsterdamCrossSpinner"
import "../ImportPage.css"
import "./ImportStatusPage.css"

const getErrorMessage = (error: unknown) => {
  const apiError = error as ApiError | undefined
  return apiError?.detail || apiError?.message || "Status ophalen is niet gelukt."
}

const getCaseData = (result: unknown): ProcessedCaseResult[] => {
  if (!result || typeof result !== "object") return []
  const maybeCaseData = (result as { case_data?: unknown }).case_data
  if (!Array.isArray(maybeCaseData)) return []

  return maybeCaseData.filter(
    (item): item is ProcessedCaseResult =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as ProcessedCaseResult).success === "boolean" &&
      typeof (item as ProcessedCaseResult).msg === "string",
  )
}

const countFailedCases = (cases: ProcessedCaseResult[]) =>
  cases.filter(({ success }) => !success).length

const failedTaskStatuses = ["FAILURE", "REVOKED"] as const

const isFailedTaskStatus = (status?: string) =>
  status !== undefined && failedTaskStatuses.includes(status as (typeof failedTaskStatuses)[number])

const ImportStatusPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>()
  const taskStatus = useBulkImportFileStatus(taskId)
  const caseData = getCaseData(taskStatus.data?.result)
  const failedCasesCount = countFailedCases(caseData)
  const succeededCasesCount = caseData.length - failedCasesCount
  const taskState = taskStatus.data?.status
  const isFailedStatus = isFailedTaskStatus(taskState)
  const isSuccessStatus = taskState === "SUCCESS"
  const isInProgressStatus =
    taskState !== undefined && !isFailedStatus && !isSuccessStatus

  return (
    <DefaultLayout>
      <Grid.Cell span="all" appearance="transparent">
        <Heading level={1}>Importstatus</Heading>
      </Grid.Cell>
      <Grid.Cell span="all">
        <Paragraph>Bestand wordt verwerkt met task_id={taskId}</Paragraph>
        {taskStatus.isError && (
          <Alert heading="Status ophalen is niet gelukt" headingLevel={2} severity="error">
            <Paragraph>{getErrorMessage(taskStatus.error)}</Paragraph>
          </Alert>
        )}
        {taskStatus.data && (
          <>
            {(isFailedStatus || isSuccessStatus) && (
              <Alert
                heading={isFailedStatus ? "Import mislukt" : "Import afgerond"}
                headingLevel={2}
                severity={isFailedStatus ? "error" : "success"}
              >
                <Paragraph>Status: {taskStatus.data.status}</Paragraph>
                {taskStatus.data.error && <Paragraph>{taskStatus.data.error}</Paragraph>}
              </Alert>
            )}
            {isInProgressStatus && (
              <div className="import-status-loading">
                <Paragraph className="import-status-loading__text">
                  Status: {taskStatus.data.status}
                </Paragraph>
                <AmsterdamCrossSpinner />
              </div>
            )}
            {taskStatus.data.result && (
              <>
                <Heading level={3}>Resultaat</Heading>
                {caseData.length > 0 ? (
                  <>
                    <Paragraph>
                      Zaken geimporteerd: {succeededCasesCount} | niet importeerbaar: {failedCasesCount}
                    </Paragraph>
                    <ul
                      className="import-case-results"
                      aria-label="Importresultaten per zaak"
                    >
                      {caseData.map((caseResult, index) => (
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
                  </>
                ) : (
                  <pre>{JSON.stringify(taskStatus.data.result, null, 2)}</pre>
                )}
              </>
            )}
          </>
        )}
      </Grid.Cell>
    </DefaultLayout>
  )
}

export default ImportStatusPage







