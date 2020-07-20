import useApiRequest from "./useApiRequest"
import slashSandwich from "slash-sandwich/dist/slash-sandwich"
import { createGroupConfig } from "./createGroupConfig"

type APIListResponse<T> = {
  count: number
  results: T[]
}

/**
 * Please configure your endpoints here:
 */

const caseGroupConfig = createGroupConfig("cases")
export const useCases = () =>
  useApiRequest<APIListResponse<API.Case>>({
    url: slashSandwich([process.env.REACT_APP_GATEWAY, "cases"]),
    group: caseGroupConfig    // NOTE: "cases" and "cases/:id" share the same group config. Cache will be cleared for the whole group. Requests will be queued within the same group.
  })

export const useCase = (id: API.Case["id"]) =>
  useApiRequest<API.Case>({
    url: slashSandwich([process.env.REACT_APP_GATEWAY, "cases", id]),
    group: caseGroupConfig
  })

const caseTypesConfig = createGroupConfig("case-types")
export const useCaseTypes = () =>
  useApiRequest<APIListResponse<API.CaseType>>({
    url: slashSandwich([process.env.REACT_APP_GATEWAY, "case-types"]),
    group: caseTypesConfig
  })

const caseStatesConfig = createGroupConfig("case-states")
export const useCaseStates = () =>
  // TODO fix when API.CaseState is reintroduced
  useApiRequest<APIListResponse<any>>({
    url: slashSandwich([process.env.REACT_APP_GATEWAY, "states"]),
    group: caseStatesConfig
  })

