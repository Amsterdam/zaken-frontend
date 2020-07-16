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
    url: slashSandwich([process.env.REACT_APP_GATEWAY, "cases"])
  })

export const useCase = (id: API.Case["id"]) =>
  useApiRequest<API.Case>({
    url: slashSandwich([process.env.REACT_APP_GATEWAY, "cases", id])
  })

export const useCaseTypes = () =>
  useApiRequest<APIListResponse<API.CaseType>>({
    url: slashSandwich([process.env.REACT_APP_GATEWAY, "case-types"])
  })

export const useCaseStates = () =>
  // TODO fix when API.CaseState is reintroduced
  //useApiRequest<API.State[]>({
  useApiRequest<APIListResponse<any>>({
    url: slashSandwich([process.env.REACT_APP_GATEWAY, "states"])
  })

