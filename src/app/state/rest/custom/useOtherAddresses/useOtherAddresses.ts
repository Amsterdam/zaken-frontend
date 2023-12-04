import { useBAG, useBAGWithStreet } from "app/state/rest/index"
import getAddressFromBagResults from "app/components/addresses/utils/getAddressFromBagResults"

/**
 * Returns other addresses with the same postcode + huisnummer
 * @param bagId
 */
const useOtherAddressesByBagId = (bagId: Components.Schemas.Address["bag_id"]) => {
  const [data] = useBAG(bagId)
  const foundAddress = getAddressFromBagResults(data)
  const searchQuery = `${ foundAddress?.postcode } ${ foundAddress?.huisnummer }`
  const [otherAddresses, otherAddressesMethods] = useBAGWithStreet(searchQuery, { lazy: data === undefined })
  return [otherAddresses?.results?.filter(({ huisnummer }) => huisnummer === foundAddress?.huisnummer), otherAddressesMethods] as const
}
export default useOtherAddressesByBagId
