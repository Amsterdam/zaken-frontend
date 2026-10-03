import { useEffect } from "react"
import { useAddress, useBagPdokByBagId } from "@/api/hooks"
import { getAddressFromBagPdokResponse } from "app/components/addresses/utils"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

/**
 * The address of a bag id, from PDOK. When PDOK doesn't know the address, a
 * flash message says so, with the address our own API has for it.
 */
export const useBagAddress = (
  bagId: components["schemas"]["Address"]["bag_id"],
) => {
  const { data, isLoading: isBusy } = useBagPdokByBagId(bagId)
  const address = getAddressFromBagPdokResponse(data)
  const { addErrorFlashMessage } = useFlashMessages()
  const hasNoDocs = !isBusy && data?.response?.docs?.length === 0
  // Only when PDOK doesn't know the address: our own API provides the address for the message below.
  const { data: ownAddress, isFetched: isAddressFetched } = useAddress(bagId, {
    enabled: hasNoDocs,
  })
  const fullAddress = ownAddress?.full_address

  useEffect(() => {
    if (hasNoDocs && isAddressFetched) {
      addErrorFlashMessage(
        "Oeps er ging iets mis!",
        `Het ophalen van de BAG-informatie uit het BRK is mislukt voor ${fullAddress || "onbekend adres"}. 
          Zijn de adresgegevens gewijzigd? Maak een melding via de feedbackknop.`,
      )
    }
  }, [hasNoDocs, isAddressFetched, fullAddress, addErrorFlashMessage])

  return { address, isBusy }
}

export default useBagAddress
