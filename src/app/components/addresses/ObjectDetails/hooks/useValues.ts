export default (BAGAddressResponse?: BAGAddressResponse, BAGObjectResponse?: BAGObjectResponse) => {

  if (BAGAddressResponse === undefined || BAGObjectResponse === undefined) return

  const values = [
    ["Bestemming", BAGAddressResponse.results[0]?.type ?? "-"],
    ["Oppervlakte", `${ BAGObjectResponse.oppervlakte }m²`],
    ["Bouwlagen", BAGObjectResponse.bouwlagen],
    ["Aantal kamers", BAGObjectResponse.aantal_kamers]
  ]
  return Object.fromEntries(values)
}