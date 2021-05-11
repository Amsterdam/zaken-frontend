const completeCases: MockComponents.Schemas.CompleteCase[] = [
  {
    id: 1,
    title: "Ja, resultaat",
    value: "result_yes"
  },
  {
    id: 2,
    title: "Nee, geen resultaat",
    value: "result_no"
  }
]

const completeCaseReasonsYes: MockComponents.Schemas.CompleteCaseReason[] = [
  {
    id: 1,
    name: "Regulier bewoond"
  },
  {
    id: 2,
    name: "Regulier verhuurd"
  },
  {
    id: 3,
    name: "Gelegaliseerd"
  }
]

const completeCaseReasonsNo: MockComponents.Schemas.CompleteCaseReason[] = [
  {
    id: 1,
    name: "Niemand thuis"
  },
  {
    id: 2,
    name: "Geen woonfraude"
  },
  {
    id: 3,
    name: "Doorzetten naar ander team"
  },
  {
    id: 4,
    name: "Onvoldoende bewijs"
  },
  {
    id: 5,
    name: "Anders, vermeld in toelichting"
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
  completeCases,
  completeCaseReasonsNo,
  completeCaseReasonsYes,
  correspondence,
  roles
}
