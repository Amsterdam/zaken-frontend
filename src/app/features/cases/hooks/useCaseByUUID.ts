import { useGlobalState } from "app/state/state/globalState"

/**
 * Returns data, and kicks of an index onMount.
 */
export const useCaseByUUID = (uuid: API.Case["uuid"]) => {
  const { cases: { isGetting, data } } = useGlobalState()
  const caseDetails = data?.find(caseDetails => caseDetails.uuid === uuid)
  return { isGetting, caseDetails }
}
