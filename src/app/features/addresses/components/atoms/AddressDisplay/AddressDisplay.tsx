import React from "react"
import { useBAG } from "app/state/rest"
import { Typography } from "@datapunt/asc-ui"

import ShowOtherAddressesButton from "app/features/addresses/components/organisms/AddressSuffixSwitcher/ShowOtherAddressesButton"
import useOtherAddressesByBagId from "app/state/rest/custom/useOtherAddresses/useOtherAddresses"

type Props = {
  bagId: string
  headingSize?: "h1" | "h2"
}


const AddressDisplay: React.FC<Props> = ({ bagId, headingSize = "h2" }) => {
  const { data } = useBAG(bagId)
  const { data: otherAddresses } = useOtherAddressesByBagId(bagId)

  // TODO: Show loading status visually
  return <>
    <Typography as="span" styleAs={ headingSize }>
    { data ? `${ data.results[0].adres }, ${ data.results[0].postcode }` : "" }
          { otherAddresses?.results && otherAddresses?.results?.length > 1 && <ShowOtherAddressesButton bagId={bagId} /> }
    </Typography>
  </>
}
export default AddressDisplay
