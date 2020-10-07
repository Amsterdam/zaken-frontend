import React from "react"
import { useBAG } from "app/state/rest"
import { Typography } from "@datapunt/asc-ui"

import ShowOtherAddressesButton from "app/features/addresses/components/organisms/AddressSuffixSwitcher/ShowOtherAddressesButton"
import useOtherAddressesByBagId from "app/state/rest/custom/useOtherAddresses/useOtherAddresses"

type Props = {
  bagId: string
  headingSize?: "h1" | "h2"
  isHeader?: boolean
}

const AddressDisplay: React.FC<Props> = ({ bagId, headingSize = "h2", isHeader = false }) => {
  const { data } = useBAG(bagId)
  const { data: otherAddresses } = useOtherAddressesByBagId(bagId)

  const isCurrentAddress = (address: any) => address.adres.trim() === data?.results[0].adres.trim()
  const addressIndex = otherAddresses?.results.findIndex(isCurrentAddress)
  const index = addressIndex === 0 ? "first" : addressIndex === (otherAddresses?.results.length ! - 1) ? "last" : undefined

  // TODO: Show loading status visually
  return (
    <Typography as={ isHeader ? headingSize : "span" } styleAs={ headingSize }>
    { data ? `${ data.results[0].adres }, ${ data.results[0].postcode }` : "" }
          { otherAddresses?.results && otherAddresses?.results?.length > 1 &&
            <ShowOtherAddressesButton bagId={bagId} index={index} />
          }
    </Typography>
  )
}
export default AddressDisplay
