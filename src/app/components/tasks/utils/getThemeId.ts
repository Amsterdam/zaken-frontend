
const getThemeId = (
  themes: components["schemas"]["CaseTheme"][] = [],
  themeName?: components["schemas"]["CaseTheme"]["name"],
): components["schemas"]["CaseTheme"]["id"] | undefined => (
  themes.find(theme => theme.name === themeName)?.id
);

export default getThemeId;
