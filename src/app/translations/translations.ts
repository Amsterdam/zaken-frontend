export const translationsDebrief: Record<string, string> = {
    "YES": "Overtreding",
    "NO": "Geen overtreding",
    "ADDITIONAL_RESEARCH_REQUIRED": "Nader intern onderzoek nodig",
    "ADDITIONAL_VISIT_REQUIRED": "Aanvullend huisbezoek nodig",
    "AUTHORIZATION_REQUEST": "Aanvraag machtiging",
    "SEND_TO_OTHER_THEME": "Naar ander thema"
  }
  
  export const translationsMap = (map: Record<string, string>, key: string) => map[key] ?? key
  