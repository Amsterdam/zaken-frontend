export type ApiGroup =
  | "addresses"
  | "auth"
  | "authors"
  | "case"
  | "cases"
  | "dataPunt"
  | "fines"
  | "permits"
  | "themes"
  | "supportContacts"
  | "roles"
  | "permissions"

export type Options = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
  isMockExtended?: boolean
}

export * from "./addresses"
export * from "./auth"
export * from "./authors"
export * from "./cases"
export * from "./tasks"
export * from "./case"
export * from "./dataPunt"
export * from "./fines"
export * from "./help"
export * from "./schedules"
export * from "./themes"
export * from "./processes"
export * from "./roles"
//export * from "./permissions"
