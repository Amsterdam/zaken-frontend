export type ApiGroup =
  | "addresses"
  | "cases"
  | "case"
  | "caseTypes"
  | "caseStates"
  | "dataPunt"
  | "fines"
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
export { useResidents, useCasesByBagId, useBAG, useBAGLodging, useBAGWithZipCode, usePanorama } from "./addresses"
export { usePermitCheckmarks, usePermitDetails } from "./permits"
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
