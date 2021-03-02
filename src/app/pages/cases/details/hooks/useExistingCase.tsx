import { useEffect } from "react"

import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import { useCase } from "app/state/rest"

export default (oId: number | undefined) => {

  const valid = isValidUrlParamId<Components.Schemas.Case["id"]>(oId)

  const [caseItem, { execGet, isBusy }, errors] = useCase(oId, { lazy: true })
  const has404 = errors.find(error => error.response.status === 404) !== undefined
  const exists = caseItem !== undefined && has404 === false

  useEffect(() => {
    if (valid === false) return
    if (caseItem !== undefined) return
    execGet()
  }, [oId, caseItem, valid, execGet])

  return [exists, isBusy, has404, oId!] as const
}