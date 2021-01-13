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

const summons: MockComponents.Schemas.Summon[] = [
  {
    id: 1,
    title: "Waarschuwing VV-vergunning"
  },
  {
    id: 2,
    title: "Waarschuwing SS-vergunning"
  },
  {
    id: 3,
    title: "Waarschuwing BB-vergunning"
  },
  {
    id: 4,
    title: "Legalisatiebrief"
  },
  {
    id: 5,
    title: "Vooraankondiging dwangsom"
  },
  {
    id: 6,
    title: "Voornemen boete"
  },
  {
    id: 7,
    title: "Voornemen invordering dwangsom"
  },
  {
    id: 8,
    title: "Meldplicht voornemen boete"
  },
  {
    id: 9,
    title: "Voornemen preventieve last"
  },
  {
    id: 10,
    title: "Voornemen tot intrekking shortstay"
  },
  {
    id: 11,
    title: "Voornemen intrekking BB-vergunning"
  },
  {
    id: 12,
    title: "Voornemen intrekking VV-vergunning"
  }
]
const cases: { id: number, mocked: boolean }[] = [
  {
    id: 989,
    mocked: true
  }
]

export default {
  teams,
  reasons,
  summons,
  cases
}
