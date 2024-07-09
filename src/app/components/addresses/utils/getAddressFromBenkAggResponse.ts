export const getAddressFromBenkAggResponse = (data?: BAGBenkAggResponse):  BAGBenkAggAddress | undefined => {
  const adresseerbareobjecten = data?._embedded?.adresseerbareobjecten ?? []
  return adresseerbareobjecten?.length > 0 ? adresseerbareobjecten[0] : undefined
}
