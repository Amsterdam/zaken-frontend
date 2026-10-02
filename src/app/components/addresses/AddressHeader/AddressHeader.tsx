import { useEffect } from "react"
import { Typography } from "@amsterdam/asc-ui"
import { SmallSkeleton } from "@amsterdam/wonen-ui"

import { useAddress, useBagPdokByBagId } from "@/api/hooks"
import ShowOtherAddressesButton, {
  Index,
} from "app/components/addresses/AddressSuffixSwitcher/ShowOtherAddressesButton"
import useOtherAddressesByBagId from "@/hooks/useOtherAddressesByBagId"
import AddressLink from "./components/AddressLink"
import { getAddressFromBagPdokResponse } from "app/components/addresses/utils"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import styles from "./AddressHeader.module.css"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
  headingSize?: React.ComponentProps<typeof Typography>["styleAs"]
  isHeader?: boolean
  enableSwitch?: boolean
}

const AddressHeader: React.FC<Props> = ({
  bagId,
  headingSize = "h2",
  isHeader = false,
  enableSwitch = true,
}) => {
  const { data, isLoading: isBusy } = useBagPdokByBagId(bagId)
  const foundAddress = getAddressFromBagPdokResponse(data)
  const [filteredAddresses] = useOtherAddressesByBagId(bagId)
  const { addErrorFlashMessage } = useFlashMessages()
  const hasNoDocs = !isBusy && data?.response?.docs?.length === 0
  // Only when PDOK doesn't know the address: our own API provides the address for the message below.
  const { data: address, isFetched: isAddressFetched } = useAddress(bagId, {
    enabled: hasNoDocs,
  })

  const showButton = enableSwitch && (filteredAddresses?.length ?? 0) > 1
  const isCurrentAddress = (address: BAGPdokAddress) =>
    address.weergavenaam === foundAddress?.weergavenaam
  const addressIndex = filteredAddresses?.findIndex(isCurrentAddress) ?? -1
  let index: Index = undefined

  if (addressIndex === 0) {
    index = "first"
  } else if (
    addressIndex > 0 &&
    addressIndex === (filteredAddresses?.length ?? 0) - 1
  ) {
    index = "last"
  }

  const fullAddress = address?.full_address

  useEffect(() => {
    if (hasNoDocs && isAddressFetched) {
      addErrorFlashMessage(
        "Oeps er ging iets mis!",
        `Het ophalen van de BAG-informatie uit het BRK is mislukt voor ${fullAddress || "onbekend adres"}. 
          Zijn de adresgegevens gewijzigd? Maak een melding via de feedbackknop.`,
      )
    }
  }, [hasNoDocs, isAddressFetched, fullAddress, addErrorFlashMessage])

  const title = foundAddress?.weergavenaam
  const className = isHeader ? styles.header : styles.default

  return (
    <div className={className}>
      {isBusy && <SmallSkeleton height={10} />}
      {title && (
        <AddressLink title={title} bagId={bagId} as={headingSize ?? "span"} />
      )}
      {showButton && <ShowOtherAddressesButton bagId={bagId} index={index} />}
    </div>
  )
}
export default AddressHeader
