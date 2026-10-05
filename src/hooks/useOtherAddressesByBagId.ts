import { useBagPdok, useBagPdokByBagId } from "@/api/hooks"
import { getAddressFromBagPdokResponse } from "@/app/components/addresses/utils"

/**
 * Returns other addresses with the same postcode + huisnummer
 * @param bagId
 */
const useOtherAddressesByBagId = (
  bagId: components["schemas"]["Address"]["bag_id"],
) => {
  const { data } = useBagPdokByBagId(bagId)
  const foundAddress = getAddressFromBagPdokResponse(data)
  const searchQuery = `${foundAddress?.postcode} ${foundAddress?.huisnummer}`
  const { data: moreAddresses, isLoading } = useBagPdok(searchQuery, {
    enabled: data !== undefined,
  })
  const otherAddresses = moreAddresses?.response?.docs?.filter(
    ({ huisnummer, postcode }) =>
      huisnummer === foundAddress?.huisnummer &&
      postcode === foundAddress?.postcode,
  )
  return [otherAddresses, { isBusy: isLoading }] as const
}
export default useOtherAddressesByBagId
