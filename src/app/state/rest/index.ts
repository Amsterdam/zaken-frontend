export type ApiGroup =
  | "auth"
  | "addresses"
  | "dataPunt"
  | "permits"
  | "fines"
  | "teams"
  | "authors"
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
export { useAuthors } from "./authors"
export { useCases, useMockCases, useCasesByBagId } from "./cases"
export {
  useCase,
  useCaseCreateUpdate,
  useCaseEvents,
  useCompleteCase,
  useCaseTasks,
  useTaskComplete,
  useCaseVisits,
  useVisitsCreate,
  useCorrespondence,
  useDebriefings,
  useDecisions,
  useSignal,
  useSummons
} from "./case"
