import useApiRequest from "./useApiRequest"

type APIListResponse<T> = {
  count: number
  results: T[]
}

/**
 * Please configure your endpoints here:
 */

export const useCases = () =>
  useApiRequest<APIListResponse<API.Case>>({
    url: "cases",
    group: "cases" // <- When a POST/PUT/PATCH/DELETE (anything other then GET) is called, cache for the whole group is invalidated
  })

export const useCase = (id: API.Case["id"]) =>
  useApiRequest<API.Case>({
    url: `cases/${ id }`,
    group: "cases"
  })

export const useCaseTypes = () =>
  useApiRequest<APIListResponse<API.CaseType>>({
    url: "case-types",
    group: "case-types"
  })

export const useCaseStates = () =>
  // TODO fix when API.CaseState is reintroduced
  //useApiRequest<API.State[]>({
  useApiRequest<APIListResponse<any>>({
    url: "states",
    group: "states"
  })

