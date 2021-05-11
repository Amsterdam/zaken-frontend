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
    id: 1,
    title: "Geen aanleiding adres opnieuw te bezoeken",
    value: "no_more_visits"
  },
  {
    id: 2,
    title: "Doorgezet naar ander team",
    value: "other_team"
  },
  {
    id: 3,
    title: "Geen woonfraude",
    value: "no_fraud"
  },
  {
    id: 4,
    title: "Onvoldoende bewijs",
    value: "no_evidence"
  },
  {
    id: 5,
    title: "Resultaat na hercontrole",
    value: "result_revisit"
  },
  {
    id: 6,
    title: "Anders, vermeld in toelichting",
    value: "other"
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
