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

