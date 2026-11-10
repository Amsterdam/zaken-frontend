import { useMutation, useQuery } from "@tanstack/react-query"
import type { ApiError } from "@/api/types/apiError"
import { queryKeys } from "@/api/queryKeys"
import { useApiFetch } from "@/api/useApiFetch"
import { makeApiUrl } from "@/api/utils/makeApiUrl"

export type ProcessedCaseResult = {
  success: boolean
  msg: string
}

export type ProcessLeegstandFileResponse = {
  total_processed: number
  total_created: number
  dry_run: boolean
  case_data: ProcessedCaseResult[]
}

export type ProcessLeegstandImportResponse = {
  task_id: string
}

export type LeegstandFileStatusResponse = {
  task_id: string
  status: string
  result: unknown
  error: string | null
}

const usePostLeegstandFile = <Response>(dryRun: boolean) => {
  const fetch = useApiFetch()

  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("dry_run", String(dryRun))

      return fetch<Response>(makeApiUrl("cases", "process-file"), {
        method: "POST",
        body: formData,
        contentType: false,
      })
    },
  })
}

export const useValidateLeegstandFile = () =>
  usePostLeegstandFile<ProcessLeegstandFileResponse>(true)

export const useImportLeegstandFile = () =>
  usePostLeegstandFile<ProcessLeegstandImportResponse>(false)

const isTerminalTaskState = (data?: LeegstandFileStatusResponse) =>
  data?.status === "SUCCESS" || Boolean(data?.error)

const isNotFoundError = (error: unknown) =>
  (error as ApiError | undefined)?.status === 404

export const useLeegstandFileStatus = (taskId?: string) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.imports.status(taskId),
    queryFn: () =>
      fetch<LeegstandFileStatusResponse>(
        makeApiUrl("cases", "process-file", taskId, "status"),
      ),
    enabled: taskId !== undefined && taskId !== "",
    retry: (failureCount, error) =>
      !isNotFoundError(error) && failureCount < 3,
    refetchInterval: ({ state }) =>
      isNotFoundError(state.error) ||
      isTerminalTaskState(state.data as LeegstandFileStatusResponse | undefined)
        ? false
        : 1000,
  })
}

