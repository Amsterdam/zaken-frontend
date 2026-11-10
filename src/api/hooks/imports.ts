import { useMutation } from "@tanstack/react-query"
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

