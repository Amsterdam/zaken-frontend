import React from "react"
import { useBAG } from "app/state/rest"
import { breakpoint, themeSpacing, Typography } from "@datapunt/asc-ui"

import ShowOtherAddressesButton from "app/features/addresses/components/organisms/AddressSuffixSwitcher/ShowOtherAddressesButton"
import useOtherAddressesByBagId from "app/state/rest/custom/useOtherAddresses/useOtherAddresses"
import styled from "styled-components"

type Props = {
  bagId: string
  headingSize?: "h1" | "h2"
  isHeader?: boolean
}

const StyledDiv = styled.div`
  @media screen and ${ breakpoint("min-width", "laptop") } {
    margin-top: ${ themeSpacing(4) }
  }
`


const AddressDisplay: React.FC<Props> = ({ bagId, headingSize = "h2", isHeader = false }) => {
  const { data } = useBAG(bagId)
  const { data: otherAddresses } = useOtherAddressesByBagId(bagId)

  // TODO: Show loading status visually
  return (
    <StyledDiv>
      <Typography as={ isHeader ? headingSize : "span" } styleAs={ headingSize }>
      { data ? `${ data.results[0].adres }, ${ data.results[0].postcode }` : "" }
            { otherAddresses?.results && otherAddresses?.results?.length > 1 && <ShowOtherAddressesButton bagId={bagId} /> }
      </Typography>
    </StyledDiv>
  )
}
export default AddressDisplay
