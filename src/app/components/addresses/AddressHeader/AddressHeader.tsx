import styled from "styled-components"
import { breakpoint, themeSpacing, Typography } from "@amsterdam/asc-ui"

import { useBAG } from "app/state/rest"
import ShowOtherAddressesButton from "app/components/addresses/AddressSuffixSwitcher/ShowOtherAddressesButton"
import useOtherAddressesByBagId from "app/state/rest/custom/useOtherAddresses/useOtherAddresses"
import AddressLink from "./components/AddressLink"
import getAddressFromBagResults from "app/components/addresses/utils/getAddressFromBagResults"

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
  const [data] = useBAG(bagId)
  const foundAddress = getAddressFromBagResults(data)
  const title = foundAddress?.adres ? `${ foundAddress.adres }, ${ foundAddress.postcode }` : undefined
  const showTitle = title !== undefined

  const [filteredAddresses] = useOtherAddressesByBagId(bagId)
  const showButton = enableSwitch && (filteredAddresses?.length ?? 0) > 1
  const isCurrentAddress = (address: { adres: string }) => address.adres.trim() === foundAddress?.adres.trim()
  const addressIndex = filteredAddresses?.findIndex(isCurrentAddress) ?? -1
  const index
    = addressIndex === 0 ? "first"
      : addressIndex > 0 && addressIndex === (filteredAddresses?.length ?? 0) - 1 ? "last"
        : undefined

  // TODO: Show loading status visually
  return (
    <Div isHeader={ isHeader }>
      { showTitle && <AddressLink title={ title } bagId={ bagId } as={ headingSize ?? "span" } /> }
      { showButton && (
        <ButtonWrap>
          <ShowOtherAddressesButton bagId={ bagId } index={ index } />
        </ButtonWrap>
      )}
    </Div>
  )
}
export default AddressHeader
