import { useAddress, useBagPdokByBagId } from "@/api/hooks"
import { getAddressFromBagPdokResponse } from "app/components/addresses/utils"

/**
 * The address of a bag id, from PDOK. When PDOK doesn't know the address,
 * `unknownAddress` is the address our own API has for it, to say so.
 */
export const useBagAddress = (
  bagId: components["schemas"]["Address"]["bag_id"],
) => {
  const { data, isLoading: isBusy } = useBagPdokByBagId(bagId)
  const address = getAddressFromBagPdokResponse(data)
  const hasNoDocs = !isBusy && data?.response?.docs?.length === 0
  // Only when PDOK doesn't know the address: our own API provides the address for the message.
  const { data: ownAddress, isFetched: isAddressFetched } = useAddress(bagId, {
    enabled: hasNoDocs,
  })
  const unknownAddress =
    hasNoDocs && isAddressFetched
      ? ownAddress?.full_address || "onbekend adres"
      : undefined

  return { address, isBusy, unknownAddress }
}

export default useBagAddress
