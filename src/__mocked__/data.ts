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
export default {
  teams,
  reasons
}