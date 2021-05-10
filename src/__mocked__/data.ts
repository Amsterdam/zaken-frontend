const completeCases: MockComponents.Schemas.CompleteCase[] = [
  {
    id: 1,
    title: "Zaak afsluiten"
  },
  {
    id: 2,
    title: "Hercontrole uitzetten"
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
  "Projectmedewerker",
  "Toezichthouder",
  "Projecthandhaver",
  "Handhavingsjurist"
]

export default {
  completeCases,
  correspondence,
  roles
}
