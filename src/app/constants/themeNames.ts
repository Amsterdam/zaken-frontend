export const THEME_NAMES = {
  GOED_VERHUURDERSCHAP: "Goed verhuurderschap",
  HUISVESTINGSVERGUNNING: "Huisvestingsvergunning",
  KAMERVERHUUR: "Kamerverhuur",
  LEEGSTAND: "Leegstand",
  ONDERHUUR: "Onderhuur",
  ONDERMIJNING: "Ondermijning",
  OPKOOPBESCHERMING: "Opkoopbescherming",
  VAKANTIEVERHUUR: "Vakantieverhuur"
} as { [key: string]: Components.Schemas.CaseTheme["name"] }

// Array of theme names that should be excluded for advertisement questions in scaffold.tsx
export const EXCLUDED_THEMES_ADVERTISEMENTS = [
  THEME_NAMES.GOED_VERHUURDERSCHAP,
  THEME_NAMES.HUISVESTINGSVERGUNNING,
  THEME_NAMES.KAMERVERHUUR,
  THEME_NAMES.ONDERMIJNING
] as const
