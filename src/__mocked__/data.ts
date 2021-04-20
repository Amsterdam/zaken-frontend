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

const tasks: MockComponents.Schemas.Task[] = [
  { label: "Bezwaardossier", value: 1 },
  { label: "Correspondentie", value: 2 },
  { label: "Melding toevoegen", value: 3 },
  { label: "Terugbelverzoek", value: 4 }
]

export default {
  completeCases,
  correspondence,
  tasks
}
