import { Typography } from "@amsterdam/asc-ui"
import { SmallSkeleton } from "@amsterdam/wonen-ui"

import ShowOtherAddressesButton, {
  Index,
} from "app/components/addresses/AddressSuffixSwitcher/ShowOtherAddressesButton"
import useOtherAddressesByBagId from "@/hooks/useOtherAddressesByBagId"
import AddressLink from "./components/AddressLink"
import { useBagAddress } from "./useBagAddress"
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
  const { address: foundAddress, isBusy } = useBagAddress(bagId)
  const [filteredAddresses] = useOtherAddressesByBagId(bagId)

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
