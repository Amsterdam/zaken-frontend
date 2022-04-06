import { DateDisplay } from "@amsterdam/wonen-ui"

export default (resident: any) => {

  const {
    leeftijd,
    geboorte: {
      datum: {
        datum: geboorteDatum
      }
    },
    verblijfplaats: {
      datumAanvangAdreshouding: {
        datum: ingeschrevenSinds
      }
    },
    naam: {
      voornamen,
      voorletters,
      geslachtsnaam
    },
    geslachtsaanduiding
  } = resident

  const values = {
    "Initialen": voorletters,
    "Voornamen": voornamen,
    "Achternaam": geslachtsnaam,
    "Geslacht": geslachtsaanduiding,
    "Geboren": <DateDisplay date={ geboorteDatum } />,
    "Leeftijd": leeftijd,
    "Ingeschreven sinds": <DateDisplay date={ ingeschrevenSinds } />
  }

  return values
}
