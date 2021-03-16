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
    title: "Boete",
    isSanction: true
  },
  {
    id: 2,
    title: "Invordering dwangsom",
    isSanction: true
  },
  {
    id: 3,
    title: "Intrekken BB-vergunning"
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
  }
]
export default {
  completeCases,
  correspondence,
  decisions,
  opinions,
  summons
}
