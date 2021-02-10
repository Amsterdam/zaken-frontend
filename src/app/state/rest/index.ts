export type ApiGroup =
  | "auth"
  | "addresses"
  | "dataPunt"
  | "permits"
  | "fines"
  | "teams"
  | "supportContacts"
  | "cases"
  | "case"

export type Options = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
  isMockExtended?: boolean
}

export { useIsAuthorized } from "./auth"
export { useResidents, usePermitCheckmarks, usePermitDetails } from "./addresses"
export { useBAG, useBAGLodging, useBAGWithZipCode, usePanorama } from "./dataPunt"
export { useFine } from "./fines"
export { useTeams, useReasons, useSummonTypes } from "./teams"
export { useSupportContacts } from "./help"
export { useCases, useMockCases, useCasesByBagId } from "./cases"
export {
  useCase,
  useCaseCreateUpdate,
  useCaseEvents,
  useCompleteCase,
  useCaseTasks,
  useTaskComplete,
  useAuthors,
  useCaseVisits,
  useVisitsCreate,
  useCorrespondence,
  useDebriefings,
  useDecisions,
  useOpinions,
  useSummon,
  useSummons
} from "./case"
