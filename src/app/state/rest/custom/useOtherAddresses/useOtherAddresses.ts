import { useBAG } from "app/state/rest/index"

/**
 * Returns other addresses with the same postcode + huisnummer
 * @param bagId
 */
const useOtherAddressesByBagId = (bagId: string) => {
  const { data } = useBAG(bagId)
  const firstResult = data?.results?.[0]
  const searchQuery = `${ firstResult?.postcode } ${ firstResult?.huisnummer }`
  const otherAddresses = useBAG(searchQuery, { lazy: data === undefined })
  return ({ ...otherAddresses, results: otherAddresses.data?.results?.filter(({ huisnummer }) => huisnummer === firstResult?.huisnummer) })
}
export default useOtherAddressesByBagId
