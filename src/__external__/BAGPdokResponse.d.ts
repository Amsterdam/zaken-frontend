declare type BAGPdokResponse = {
  response: {
    numFound: number
    docs: Array<BAGPdokAddress>
  }
}

declare type BAGPdokAddress = {
  woonplaatsnaam: string
  weergavenaam: string
  adrestype: string
  gemeentenaam: string
  postcode: string
  centroide_ll: string
  nummeraanduiding_id: string
  adresseerbaarobject_id: string
  straatnaam: string
  huisnummer: integer
  huisletter: string
  huisnummertoevoeging: string
  score: float
}
