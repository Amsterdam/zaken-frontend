export type ApiGroup =
  | "addresses"
  | "auth"
  | "authors"
  | "case"
  | "cases"
  | "dataPunt"
  | "fines"
  | "permits"
  | "teams"
  | "supportContacts"

export type Options = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
  isMockExtended?: boolean
}

export * from "./addresses"
export * from "./auth"
export * from "./authors"
export * from "./case"
export * from "./cases"
export * from "./dataPunt"
export * from "./fines"
export * from "./help"
export * from "./schedules"
export * from "./teams"
