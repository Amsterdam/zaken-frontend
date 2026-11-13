import { useMutation, useQuery } from "@tanstack/react-query"
import type { ApiError } from "@/api/types/apiError"
import { queryKeys } from "@/api/queryKeys"
import { useApiFetch } from "@/api/useApiFetch"
import { makeApiUrl } from "@/api/utils/makeApiUrl"

/** The result of a row of the Excel file. */
export type ProcessedCaseResult = {
  /** The number of the row in Excel. */
  row_number: number
  /** The address as in the file. */
  address: string
  /** The address in the BAG; null when it was not found. */
  bag_id: string | null
  success: boolean
  /** What is wrong, in words for the user; null when the row is good. */
  error: string | null
  /** The case made for it (not in a dry run). */
  case_id: number | null
}

export type ProcessBulkImportFileResponse = {
  total_processed: number
  total_created: number
  dry_run: boolean
  case_data: ProcessedCaseResult[]
}

export type ImportBulkImportFileResponse = {
  task_id: string
}

/**
 * The data that goes for all imported cases. Checking the addresses (a dry
 * run) needs only the theme; importing needs the rest too.
 */
export type ImportCaseData = {
  themeId: number
  reasonId?: number
  projectId?: number
  subjectIds?: number[]
  jumpTo?: string | null
}

export type AllowedJumpWorkflowOption = {
  value: string
  label: string
}

type PostBulkImportFileVariables =
  | File
  | {
    file: File
    caseData?: ImportCaseData
  }

const toUploadPayload = (variables: PostBulkImportFileVariables) =>
  variables instanceof File ? { file: variables } : variables

export type BulkImportFileStatusResponse = {
  task_id: string
  status: string
  result: unknown
  error: string | null
}

const usePostBulkImportFile = <Response>(dryRun: boolean) => {
  const fetch = useApiFetch()

  return useMutation<Response, ApiError, PostBulkImportFileVariables>({
    mutationFn: (variables: PostBulkImportFileVariables) => {
      const { file, caseData } = toUploadPayload(variables)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("dry_run", String(dryRun))
      if (caseData !== undefined) {
        formData.append("theme_id", String(caseData.themeId))
        if (caseData.reasonId !== undefined) {
          formData.append("reason_id", String(caseData.reasonId))
        }
        if (caseData.projectId !== undefined) {
          formData.append("project_id", String(caseData.projectId))
        }
        caseData.subjectIds?.forEach((subjectId) => {
          formData.append("subject_ids", String(subjectId))
        })
        if (caseData.jumpTo !== undefined) {
          formData.append("jump_to", caseData.jumpTo ?? "")
        }
      }

      return fetch<Response>(makeApiUrl("cases", "process-file"), {
        method: "POST",
        body: formData,
        contentType: false,
      })
    },
  })
}

export const useValidateBulkImportFile = () =>
  usePostBulkImportFile<ProcessBulkImportFileResponse>(true)

export const useImportBulkImportFile = () =>
  usePostBulkImportFile<ImportBulkImportFileResponse>(false)

export const useAllowedJumpWorkflows = () => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.imports.allowedJumpWorkflows(),
    queryFn: () =>
      fetch<AllowedJumpWorkflowOption[]>(
        makeApiUrl("cases", "allowed-jump-workflows"),
      ),
  })
}

const isTerminalTaskState = (data?: BulkImportFileStatusResponse) =>
  data?.status === "SUCCESS" || Boolean(data?.error)

const isNotFoundError = (error: unknown) =>
  (error as ApiError | undefined)?.status === 404

export const useBulkImportFileStatus = (taskId?: string) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.imports.status(taskId),
    queryFn: () =>
      fetch<BulkImportFileStatusResponse>(
        makeApiUrl("cases", "process-file", taskId, "status"),
      ),
    enabled: taskId !== undefined && taskId !== "",
    retry: (failureCount, error) =>
      !isNotFoundError(error) && failureCount < 3,
    refetchInterval: ({ state }) =>
      isNotFoundError(state.error) ||
      isTerminalTaskState(state.data as BulkImportFileStatusResponse | undefined)
        ? false
        : 1000,
  })
}

