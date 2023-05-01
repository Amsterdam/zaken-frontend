
const getThemeId = (
  themes: Components.Schemas.CaseTheme[] = [],
  themeName?: Components.Schemas.CaseTheme["name"]
): Components.Schemas.CaseTheme["id"] | undefined => (
  themes.find(theme => theme.name === themeName)?.id
)

export default getThemeId
