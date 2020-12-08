import React from "react"
import styled from "styled-components"
import { ExpandMore, ExpandLess } from "@material-ui/icons"
import { Button, Icon } from "@amsterdam/asc-ui"

import { useModal } from "app/features/shared/components/molecules/Modal/hooks/useModal"
import OtherAddressesModal from "./OtherAddressesModal"

type Index = "first" | "last" | undefined
type Props = {
  bagId: Components.Schemas.Address["bag_id"] 
  index: Index
}

const StyledIcon = styled(Icon)`
  position: absolute;
  top: -6px;
  left: -6px;
`

const renderIcon = (index: Index) => {
  switch(index) {
    case "first":
      return <StyledIcon size={32}><ExpandMore/></StyledIcon>
    case "last":
      return <StyledIcon size={32}><ExpandLess/></StyledIcon>
    default:
      return <StyledIcon
        inline
        size={32}
        iconUrl={`${ process.env.PUBLIC_URL }/icons/chevron_up_down.svg`}
      />
  }
}

const ShowOtherAddressesButton: React.FC<Props> = ({ bagId, index }) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return <>
    <Button variant="blank" icon={ renderIcon(index) } onClick={openModal} />
    <OtherAddressesModal bagId={bagId} isOpen={isModalOpen} closeModal={closeModal} />
  </>
}

export default ShowOtherAddressesButton
