import { useMutation, useQuery } from "@tanstack/react-query"
import type { ApiError } from "@/api/types/apiError"
import { queryKeys } from "@/api/queryKeys"
import { useApiFetch } from "@/api/useApiFetch"
import { makeApiUrl } from "@/api/utils/makeApiUrl"

export type ProcessedCaseResult = {
  success: boolean
  msg: string
}

export type ProcessBulkImportFileResponse = {
  total_processed: number
  total_created: number
  dry_run: boolean
  case_data: ProcessedCaseResult[]
}

export type ProcessLeegstandImportResponse = {
  task_id: string
}

export type ImportTemplateSelection = {
  themeId: number
  reasonId: number
  projectId?: number
  subjectIds: number[]
  jumpTo: string | null
}

export type AllowedJumpWorkflowOption = {
  value: string
  label: string
}

type PostBulkImportFileVariables =
  | File
  | {
    file: File
    templateCase?: ImportTemplateSelection
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
      const { file, templateCase } = toUploadPayload(variables)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("dry_run", String(dryRun))
      if (templateCase !== undefined) {
        formData.append("theme_id", String(templateCase.themeId))
        formData.append("reason_id", String(templateCase.reasonId))
        if (templateCase.projectId !== undefined) {
          formData.append("project_id", String(templateCase.projectId))
        }
        templateCase.subjectIds.forEach((subjectId) => {
          formData.append("subject_ids", String(subjectId))
        })
        formData.append("jump_to", templateCase.jumpTo ?? "")
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
  usePostBulkImportFile<ProcessLeegstandImportResponse>(false)

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

