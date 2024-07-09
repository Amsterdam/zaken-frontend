import styled from "styled-components"
import { breakpoint, themeSpacing, Typography } from "@amsterdam/asc-ui"
import { SmallSkeleton } from "@amsterdam/wonen-ui"

import { useBagPdok } from "app/state/rest"
import ShowOtherAddressesButton, { Index } from "app/components/addresses/AddressSuffixSwitcher/ShowOtherAddressesButton"
import useOtherAddressesByBagId from "app/state/rest/custom/useOtherAddresses/useOtherAddresses"
import AddressLink from "./components/AddressLink"
import { getAddressFromBagPdokResponse } from "app/components/addresses/utils"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
  headingSize?: React.ComponentProps<typeof Typography>["styleAs"]
  isHeader?: boolean
  enableSwitch?: boolean
}

const Div = styled.div<{ isHeader: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media screen and ${ breakpoint("min-width", "laptopM") } {
    justify-content: ${ props => props.isHeader ? "flex-start" : "flex-end" };
  }
`

const ButtonWrap = styled.div`
  margin: -${ themeSpacing(2) } 0 0 ${ themeSpacing(3) };
`

const AddressHeader: React.FC<Props> = ({ bagId, headingSize = "h2", isHeader = false, enableSwitch = true }) => {
  const [data, { isBusy }] = useBagPdok(bagId)
  const foundAddress = getAddressFromBagPdokResponse(data)
  const [filteredAddresses] = useOtherAddressesByBagId(bagId)
  const showButton = enableSwitch && (filteredAddresses?.length ?? 0) > 1
  const isCurrentAddress = (address: BAGPdokAddress ) => address.weergavenaam === foundAddress?.weergavenaam
  const addressIndex = filteredAddresses?.findIndex(isCurrentAddress) ?? -1
  let index: Index = undefined
  if (addressIndex === 0) {
    index = "first"
  } else if (addressIndex > 0 && addressIndex === (filteredAddresses?.length ?? 0) - 1) {
    index = "last"
  }

  const title = foundAddress?.weergavenaam
  return (
    <Div isHeader={ isHeader }>
      { isBusy && <SmallSkeleton height={ 10 } /> }
      { title && <AddressLink title={ title } bagId={ bagId } as={ headingSize ?? "span" } /> }
      { showButton && (
        <ButtonWrap>
          <ShowOtherAddressesButton bagId={ bagId } index={ index } />
        </ButtonWrap>
      )}
    </Div>
  )
}
export default AddressHeader
