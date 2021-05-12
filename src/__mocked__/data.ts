const completeCaseResults: MockComponents.Schemas.CompleteCaseResult[] = [
  {
    id: 1,
    title: "Regulier bewoond"
  },
  {
    id: 2,
    title: "Regulier verhuurd"
  },
  {
    id: 3,
    title: "Gelegaliseerd"
  }
]

const completeCaseReasons: MockComponents.Schemas.CompleteCaseReason[] = [
  {
    id: 0,
    name: "Geen aanleiding adres opnieuw te bezoeken",
    value: 0
  },
  {
    id: 1,
    name: "Doorgezet naar ander team",
    value: 1
  },
  {
    id: 2,
    name: "Geen woonfraude",
    value: 2
  },
  {
    id: 3,
    name: "Onvoldoende bewijs",
    value: 3
  },
  {
    id: 4,
    name: "Resultaat na hercontrole",
    value: 4
  },
  {
    id: 5,
    name: "Anders, vermeld in toelichting",
    value: 5
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
  completeCaseResults,
  completeCaseReasons,
  correspondence,
  roles
}
