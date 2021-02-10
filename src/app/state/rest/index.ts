

export type ApiGroup =
  | "addresses"
  | "cases"
  | "case"
  | "caseTypes"
  | "caseStates"
  | "dataPunt"
  | "permits"
  | "auth"
  | "supportContacts"
  | "teams"

export type Options = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
  isMockExtended?: boolean
}

export { useIsAuthorized } from "./auth"
export { useResidents, useCasesByBagId, useBAG, useBAGLodging, useBAGWithZipCode, usePanorama, usePermitCheckmarks, usePermitDetails } from "./addresses"
export { useCases, useMockCases } from "./cases"
export { useSupportContacts } from "./help"
export { useFine } from "./fines"
export {
  useCase,
  useCaseCreateUpdate,
  useCaseEvents,
  useCompleteCase,
  useTeams,
  useCaseTasks,
  useTaskComplete,
  useAuthors,
  useCaseVisits,
  useVisitsCreate,
  useCorrespondence,
  useDebriefings,
  useDecisions,
  useOpinions,
  useReasons,
  useSummon,
  useSummons,
  useSummonTypes
} from "./case"
