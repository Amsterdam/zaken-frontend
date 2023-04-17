import * as Constants from "./constants"

const THEMES_WITH_CORPORATIONS: Components.Schemas.CaseTheme["id"][] = [
  Constants.LEEGSTAND_THEME_ID,
  Constants.ONDERHUUR_THEME_ID
]

export const isThemeWithCorporations = (themeId: Components.Schemas.CaseTheme["id"]) => (
  THEMES_WITH_CORPORATIONS.includes(themeId)
)
