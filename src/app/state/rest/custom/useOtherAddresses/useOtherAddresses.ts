import { useBagPdok, useBagPdokByBagId } from "app/state/rest/index"
import { getAddressFromBagPdokResponse } from "app/components/addresses/utils"

/**
 * Returns other addresses with the same postcode + huisnummer
 * @param bagId
 */
const useOtherAddressesByBagId = (bagId: Components.Schemas.Address["bag_id"]) => {
  const [data] = useBagPdokByBagId(bagId)
  const foundAddress = getAddressFromBagPdokResponse(data)
  const searchQuery = `${ foundAddress?.postcode } ${ foundAddress?.huisnummer }`
  const [moreAddresses, otherAddressesMethods] = useBagPdok(searchQuery, { lazy: data === undefined })
  const otherAddresses = moreAddresses?.response?.docs?.filter(({ huisnummer, postcode }) => (
    huisnummer === foundAddress?.huisnummer && postcode === foundAddress?.postcode 
  ))
  return [otherAddresses, otherAddressesMethods] as const
}
export default useOtherAddressesByBagId
