const caseCloseReasons: MockComponents.Schemas.CaseCloseReason[] = [
  {
    id: 0,
    name: "Geen aanleiding adres opnieuw te bezoeken",
    result: false,
    case_theme: 58
  },
  {
    id: 1,
    name: "Doorgezet naar ander team",
    result: false,
    case_theme: 58
  },
  {
    id: 2,
    name: "Geen woonfraude",
    result: false,
    case_theme: 58
  },
  {
    id: 3,
    name: "Onvoldoende bewijs",
    result: false,
    case_theme: 58
  },
  {
    id: 4,
    name: "Resultaat na hercontrole",
    result: true,
    case_theme: 58
  },
  {
    id: 5,
    name: "Anders, vermeld in toelichting",
    result: false,
    case_theme: 58
  }
]

const caseCloseResults: MockComponents.Schemas.CaseCloseResult[] = [
  {
    id: 1,
    name: "Regulier bewoond",
    case_theme: 58
  },
  {
    id: 2,
    name: "Regulier verhuurd",
    case_theme: 58
  },
  {
    id: 3,
    name: "Gelegaliseerd",
    case_theme: 58
  }
]


const correspondence: MockComponents.Schemas.Correspondence[] = [
  {
    id: 1,
    title: "Correspondentie"
  },
  {
    id: 2,
    title: "Terugbel verzoek"
  },
  {
    id: 3,
    title: "Melding"
  }
]

const roles: MockComponents.Schemas.Role[] = [
  "Handhavingsjurist",
  "Projecthandhaver",
  "Projectmedewerker",
  "Toezichthouder"
]

export default {
  caseCloseReasons,
  caseCloseResults,
  correspondence,
  roles
}
