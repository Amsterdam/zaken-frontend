import { useEffect } from "react"
import { Typography } from "@amsterdam/asc-ui"
import { SmallSkeleton } from "@amsterdam/wonen-ui"

import { useAddresses, useBagPdokByBagId } from "app/state/rest"
import ShowOtherAddressesButton, {
  Index
} from "app/components/addresses/AddressSuffixSwitcher/ShowOtherAddressesButton"
import useOtherAddressesByBagId from "app/state/rest/custom/useOtherAddresses/useOtherAddresses"
import AddressLink from "./components/AddressLink"
import { getAddressFromBagPdokResponse } from "app/components/addresses/utils"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import styles from "./AddressHeader.module.css"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
  headingSize?: React.ComponentProps<typeof Typography>["styleAs"]
  isHeader?: boolean
  enableSwitch?: boolean
}

const AddressHeader: React.FC<Props> = ({
  bagId,
  headingSize = "h2",
  isHeader = false,
  enableSwitch = true
}) => {
  const [data, { isBusy }] = useBagPdokByBagId(bagId)
  const foundAddress = getAddressFromBagPdokResponse(data)
  const [filteredAddresses] = useOtherAddressesByBagId(bagId)
  const { addErrorFlashMessage } = useFlashMessages()
  const [, { execGet }] = useAddresses(bagId, { lazy: true })

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

  useEffect(() => {
    // Gebruik een simpele boolean in plaats van de hele array
    const hasNoDocs = !isBusy && data?.response?.docs?.length === 0

    if (hasNoDocs) {
      execGet().then((resp) => {
        const response = resp as { data: { full_address?: string } }
        const fullAddress = response.data?.full_address || "onbekend adres"

        addErrorFlashMessage(
          "Oeps er ging iets mis!",
          `Het ophalen van de BAG-informatie uit het BRK is mislukt voor ${fullAddress}. 
          Zijn de adresgegevens gewijzigd? Maak een melding via de feedbackknop.`
        )
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bagId, isBusy])


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
