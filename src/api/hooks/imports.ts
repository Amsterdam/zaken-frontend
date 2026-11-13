import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { ApiError } from "@/api/types/apiError"
import { queryKeys } from "@/api/queryKeys"
import { useApiFetch } from "@/api/useApiFetch"
import { makeApiUrl } from "@/api/utils/makeApiUrl"

/** The result of a row of the Excel file. */
export type ImportRowResult = {
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

export type ImportCheckResponse = {
  total_processed: number
  total_created: number
  dry_run: boolean
  case_data: ImportRowResult[]
}

export type ImportStartResponse = {
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
  jumpTo?: string
  /** For all cases, above the explanation of the row in the file. */
  description?: string
}

/** A step of the process a new case can start at, skipping the ones before. */
export type AllowedJumpWorkflowOption = {
  value: string
  label: string
  /** The names of the themes it belongs to; null for every theme. */
  themes: string[] | null
}

type PostImportFileVariables = {
  file: File
  caseData: ImportCaseData
}

export type ImportStatusResponse = {
  task_id: string
  /** The state of the Celery task: PENDING, STARTED, SUCCESS, FAILURE, … */
  status: string
  /** The result of the import, once it is done (SUCCESS). */
  result: ImportCheckResponse | null
  error: string | null
}

const usePostImportFile = <Response>(dryRun: boolean) => {
  const fetch = useApiFetch()

  return useMutation<Response, ApiError, PostImportFileVariables>({
    mutationFn: ({ file, caseData }: PostImportFileVariables) => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("dry_run", String(dryRun))
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
      if (caseData.description !== undefined) {
        formData.append("description", caseData.description)
      }
      if (caseData.jumpTo !== undefined) {
        formData.append("jump_to", caseData.jumpTo)
      }

      return fetch<Response>(makeApiUrl("cases", "process-file"), {
        method: "POST",
        formData,
      })
    },
  })
}

export const useCheckImportFile = () =>
  usePostImportFile<ImportCheckResponse>(true)

export const useImportFile = () =>
  usePostImportFile<ImportStartResponse>(false)

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

const isTerminalTaskState = (data?: ImportStatusResponse) =>
  data?.status === "SUCCESS" || Boolean(data?.error)

const isNotFoundError = (error: unknown) =>
  (error as ApiError | undefined)?.status === 404

export const useImportStatus = (taskId?: string) => {
  const fetch = useApiFetch()
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: queryKeys.imports.status(taskId),
    queryFn: async () => {
      const data = await fetch<ImportStatusResponse>(
        makeApiUrl("cases", "process-file", taskId, "status"),
      )
      // Once the cases are made, the lists that show them are out of date:
      // fetched again when they are shown (as after creating one case).
      if (data.status === "SUCCESS") {
        await Promise.all(
          [
            queryKeys.cases.listAll,
            queryKeys.cases.byAddressAll,
            queryKeys.cases.tasksAll,
          ].map((queryKey) =>
            queryClient.invalidateQueries({ queryKey, refetchType: "none" }),
          ),
        )
      }
      return data
    },
    enabled: taskId !== undefined && taskId !== "",
    retry: (failureCount, error) =>
      !isNotFoundError(error) && failureCount < 3,
    refetchInterval: ({ state }) =>
      isNotFoundError(state.error) ||
      isTerminalTaskState(state.data)
        ? false
        : // An import takes minutes: every 3 seconds is soon enough.
          3000,
  })
}

