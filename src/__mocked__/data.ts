const caseprojects: MockComponents.Schemas.PaginatedCaseProjectList = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      name: "Project 1",
      theme: 58
    },
    {
      id: 2,
      name: "Project 2",
      theme: 58
    }
  ]
}

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
  caseprojects,
  correspondence,
  roles
}
