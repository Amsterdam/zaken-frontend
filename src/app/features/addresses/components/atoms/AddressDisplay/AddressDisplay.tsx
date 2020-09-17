import React from "react"
import { useBAG } from "app/state/rest"
import { Heading } from "@datapunt/asc-ui"
import styled from "styled-components"

import ShowOtherAddressesButton from "app/features/addresses/components/organisms/AddressSuffixSwitcher/ShowOtherAddressesButton"
import useOtherAddressesByBagId from "app/state/rest/custom/useOtherAddresses/useOtherAddresses"

type Props = {
  bagId: string
}

const StyledHeading = styled(Heading)`
  display: block;
`

const AddressDisplay: React.FC<Props> = ({ bagId }) => {
  const { data } = useBAG(bagId)
  const { data: otherAddresses } = useOtherAddressesByBagId(bagId)

  // TODO: Show loading status visually
  return <>
    <StyledHeading>
      { data ? `${ data.results[0].adres }, ${ data.results[0].postcode }` : "" }
      { otherAddresses?.results && otherAddresses?.results?.length > 1 && <ShowOtherAddressesButton bagId={bagId} /> }
    </StyledHeading>
  </>
}
export default AddressDisplay
