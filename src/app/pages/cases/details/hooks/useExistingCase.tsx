import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import { useCase } from "@/api/hooks"
import type { ApiError } from "@/api/types/apiError"

export default (oId: number | undefined) => {
  const valid =
    isValidUrlParamId<components["schemas"]["CaseDetail"]["id"]>(oId)
  const {
    data: caseItem,
    isLoading: isBusy,
    error,
  } = useCase(valid ? oId : undefined)
  const has404 = (error as ApiError | null)?.status === 404
  const exists = caseItem !== undefined && !has404

  return [exists, isBusy, has404, oId!, caseItem] as const
}
