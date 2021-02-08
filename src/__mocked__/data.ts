const camundaTasks: Components.Schemas.CamundaTask[] = [
  {
    camunda_task_id: "6e792281-5b22-11eb-a1f9-0242ac110017",
    task_name_id: "task_create_visit",
    name: "Huisbezoek aanmaken"
  },{
    camunda_task_id: "6e792281-5b22-11eb-a1f9-0242ac110018",
    task_name_id: "task_visit_succesful",
    name: "Huisbezoek afgelegd"
  },
  {
    camunda_task_id: "6e792281-5b22-11eb-a1f9-0242ac110019",
    task_name_id: "task_create_debrief",
    name: "Debrief verwerken"
  }
]

const cases: MockComponents.Schemas.Case[] = [
  {
    id: 996,
    team: { id: 1, title: "Vakantieverhuur" },
    mocked: true
  }
]

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

const decisions: MockComponents.Schemas.Decision[] = [
  {
    id: 1,
    title: "Boete"
  },
  {
    id: 2,
    title: "Afzien besluit"
  }
]

const opinions: MockComponents.Schemas.Opinion[] = [
  {
    id: 1,
    title: "Afzien aanschrijving"
  },
  {
    id: 2,
    title: "Opstellen besluit"
  }
]

const reasons: MockComponents.Schemas.Reason[] = [
  {
    id: 1,
    title: "Melding",
    enabled: true
  },
  {
    id: 2,
    title: "Scraping",
    enabled: false
  },
  {
    id: 3,
    title: "Project",
    enabled: false
  }
]

const teams: MockComponents.Schemas.Team[] = [
  {
    id: 1,
    title: "Vakantieverhuur",
    enabled: true
  },
  {
    id: 2,
    title: "Criminele spookburgers",
    enabled: false
  },
  {
    id: 3,
    title: "Goed verhuurdersschap",
    enabled: false
  },
  {
    id: 4,
    title: "Leegstand",
    enabled: false
  },
  {
    id: 5,
    title: "Onderhuur en Adreskwaliteit",
    enabled: false
  },
  {
    id: 6,
    title: "Woningkwaliteit",
    enabled: false
  },
  {
    id: 7,
    title: "Woningdelen",
    enabled: false
  }
]

export default {
  camundaTasks,
  cases,
  completeCases,
  correspondence,
  decisions,
  opinions,
  reasons,
  teams
}
