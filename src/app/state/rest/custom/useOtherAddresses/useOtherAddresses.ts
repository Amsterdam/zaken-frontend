import { useBAG, useBAGWithStreet } from "app/state/rest/index"

/**
 * Returns other addresses with the same postcode + huisnummer
 * @param bagId
 */
const useOtherAddressesByBagId = (bagId: Components.Schemas.Address["bag_id"]) => {
  const [data] = useBAG(bagId)
  const firstResult = data?.results?.[0]
  const searchQuery = `${ firstResult?.postcode } ${ firstResult?.huisnummer }`
  const [otherAddresses, otherAddressesMethods] = useBAGWithStreet(searchQuery, { lazy: data === undefined })
  return [otherAddresses?.results?.filter(({ huisnummer }) => huisnummer === firstResult?.huisnummer), otherAddressesMethods] as const
}
export default useOtherAddressesByBagId
