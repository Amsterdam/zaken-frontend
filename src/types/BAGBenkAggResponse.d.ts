declare type BAGBenkAggResponse = {
  page: {
    number: number
    size: number
  }
  _embedded: {
    adresseerbareobjecten: Array<BAGBenkAggAddress>
  }
}

// The fields the app uses; the API returns many more. Most can be null.
declare type BAGBenkAggAddress = {
  openbareruimteNaam: string
  huisnummer: number
  huisletter: string | null
  huisnummertoevoeging: string | null
  postcode: string
  typeAdres: string | null
  typeAdresseerbaarObjectOmschrijving: string | null
  verblijfsobjectStatusOmschrijving: string | null
  verblijfsobjectOppervlakte: number | null
  verblijfsobjectAantalBouwlagen: number | null
  verblijfsobjectAantalKamers: number | null
  verblijfsobjectVerdiepingToegang: number | null
  verblijfsobjectEigendomsverhoudingOmschrijving: string | null
  // Since when this state holds, as an ISO date with a time: of the address
  // itself, and of the kind of object it is (the other two are null).
  beginGeldigheid: string | null
  verblijfsobjectBeginGeldigheid: string | null
  ligplaatsBeginGeldigheid: string | null
  standplaatsBeginGeldigheid: string | null
  // The BAG process that led to this state, per kind of object.
  verblijfsobjectBagproces: string | number | null
  ligplaatsBagproces: string | number | null
  standplaatsBagproces: string | number | null
  gebiedenStadsdeelNaam: string | null
  gebiedenWijkNaam: string | null
  gebiedenBuurtNaam: string | null
  gebruiksdoelOmschrijvingen: Array<string> | null
  toegangOmschrijvingen: Array<string> | null
  wozSoortObjectOmschrijving: Array<string> | null
  /** The place as GeoJSON: [longitude, latitude]. */
  adresseerbaarObjectPuntGeometrieWgs84: {
    type: "Point"
    coordinates: [number, number]
  } | null
  /** Each building as a JSON text, with keys like "bouwjaar Pand". */
  panden: Array<string> | null
}
