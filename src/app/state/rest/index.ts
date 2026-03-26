export type ApiGroup =
  | "addresses"
  | "auth"
  | "case"
  | "cases"
  | "dataPunt"
  | "fines"
  | "housingCorporations"
  | "listings"
  | "permissions"
  | "permits"
  | "roles"
  | "supportContacts"
  | "task"
  | "themes"
  | "users"

export type Options = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
  isMockExtended?: boolean
}

export * from "./addresses"
export * from "./auth"
export * from "./bagPdok"
export * from "./benkAgg"
export * from "./case"
export * from "./cases"
export * from "./dataPunt"
export * from "./feedback"
export * from "./fines"
export * from "./help"
export * from "./listing"
export * from "./permissions"
export * from "./processes"
export * from "./reasons"
export * from "./residents"
export * from "./roles"
export * from "./schedules"
export * from "./tasks"
export * from "./themes"
export * from "./tokenOboService"
export * from "./users"
