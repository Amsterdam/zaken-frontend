import useApiRequest from "./useApiRequest"
import slashSandwich from "slash-sandwich/dist/slash-sandwich"

type APIListResponse<T> = {
  count: number
  results: T[]
}

/**
 * Please configure your endpoints here:
 */
export const useCases = () =>
  useApiRequest<APIListResponse<API.Case>>({
    url: slashSandwich([process.env.REACT_APP_GATEWAY, "cases"]),
    groupName: "cases"    // NOTE: "cases" and "cases/:id" share the same group config. Cache will be cleared for the whole group. Requests will be queued within the same group.
  })

export const useCase = (id: API.Case["id"]) =>
  useApiRequest<API.Case>({
    url: slashSandwich([process.env.REACT_APP_GATEWAY, "cases", id]),
    groupName: "cases"
  })

export const useCaseTypes = () =>
  useApiRequest<APIListResponse<API.CaseType>>({
    url: slashSandwich([process.env.REACT_APP_GATEWAY, "case-types"]),
    groupName: "case-types"
  })

export const useCaseStates = () =>
  // TODO fix when API.CaseState is reintroduced
  useApiRequest<APIListResponse<any>>({
    url: slashSandwich([process.env.REACT_APP_GATEWAY, "states"]),
    groupName: "case-states"
  })

