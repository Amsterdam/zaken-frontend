import { useEffect } from "react"

import { useGlobalState, useGlobalActions } from "app/state/state/globalState"

/**
 * Returns data, and kicks of an index onMount.
 */
export const useCaseByUUID = (uuid: API.Case["uuid"]) => {
  const { cases: { index } } = useGlobalActions()
  const { cases: { isFetching, data } } = useGlobalState()

  useEffect(() => {
    index()
  }, [index])

  const caseDetails = data?.find(caseDetails => caseDetails.uuid === uuid)

  return { isFetching, caseDetails }
}
