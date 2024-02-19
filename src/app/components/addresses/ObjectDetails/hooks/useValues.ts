export default (BAGAddress?: BAGAddressResponse["results"][number], BAGObjectResponse?: BAGObjectResponse) => {

  if (BAGAddress === undefined || BAGObjectResponse === undefined) return

  const values = [
    ["Bestemming", BAGAddress?.type ?? "-"],
    ["Oppervlakte", BAGObjectResponse.oppervlakte ? `${ BAGObjectResponse.oppervlakte }m²` : "-"],
    ["Bouwlagen", BAGObjectResponse.bouwlagen],
    ["Aantal kamers", BAGObjectResponse.aantal_kamers]
  ]
  return Object.fromEntries(values)
}