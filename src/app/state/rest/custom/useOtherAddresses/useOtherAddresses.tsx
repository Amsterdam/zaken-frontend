import { useBAG } from "../../index"

/**
 * Returns other addresses with the same postcode + huisnummer
 * @param bagId
 */
const useOtherAddressesByBagId = (bagId: string) => {
  const { data } = useBAG(bagId)
  const firstResult = data?.results?.[0]
  const searchQuery = `${ firstResult?.postcode } ${ firstResult?.huisnummer }`
  return useBAG(searchQuery, { lazy: data === undefined })
}

export default useOtherAddressesByBagId
