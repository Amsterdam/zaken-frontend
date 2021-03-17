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

const summon: MockComponents.Schemas.Summon = {
  
  id: 1,
  type: 1,
  case: 3395,
  persons: [
    {
      id: 1,
      first_name: "Voornaam",
      preposition: "van",
      last_name: "Achter",
      summon: 0
    }
  ],
  date_added: "01/01/2021"
}
const summonTypes: MockComponents.Schemas.SummonType[] = [
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
  opinions,
  summon,
  summonTypes
}
