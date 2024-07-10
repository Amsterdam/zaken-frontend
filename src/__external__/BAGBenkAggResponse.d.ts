declare type BAGBenkAggResponse = {
  page: {
    number: number
    size: number
  }
  _embedded: {
    adresseerbareobjecten: Array<BAGBenkAggAddress>
  }
}

declare type BAGBenkAggAddress = {
  openbareruimteNaam: string
  huisnummer: number
  huisletter: string
  huisnummertoevoeging: string
  postcode: string
  verblijfsobjectOppervlakte: number
  verblijfsobjectAantalBouwlagen: number
  verblijfsobjectAantalKamers: number
  typeAdres: string
  gebiedenStadsdeelNaam: string
  gebruiksdoelOmschrijvingen: Array<string>
  toegangOmschrijvingen: Array<string>
  wozSoortObjectOmschrijving: Array<string>
}
