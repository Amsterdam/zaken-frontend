import useApiRequest from "./useApiRequest"

/**
 * Please configure your endpoints here:
 */

export const useCases = () =>
  useApiRequest<API.Case[]>({
    url: "cases",
    group: "cases" // <- When a POST/PUT/PATCH/DELETE (anything other then GET) is called, cache for the whole group is invalidated
  })

export const useCase = (uuid: string) =>
  useApiRequest<API.Case>({
    url: `cases/${ uuid }`,
    group: "cases"
  })

export const useCaseTypes = () =>
  useApiRequest<API.CaseType[]>({
    url: "case-types",
    group: "case-types"
  })

export const useCaseStates = () =>
  useApiRequest<API.State[]>({
    url: "states",
    group: "states"
  })

