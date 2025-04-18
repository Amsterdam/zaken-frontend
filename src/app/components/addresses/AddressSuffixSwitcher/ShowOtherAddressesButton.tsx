
import styled from "styled-components"
import { Button, Icon } from "@amsterdam/asc-ui"
import { useModal } from "app/components/shared/Modal/hooks/useModal"
import OtherAddressesModal from "./OtherAddressesModal"
import { env } from "app/config/env"
import CustomIcon from "app/components/shared/CustomIcon/CustomIcon"

export type Index = "first" | "last" | undefined
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
      return <StyledIcon size={ 32 }><CustomIcon name="ExpandMore"/></StyledIcon>
    case "last":
      return <StyledIcon size={ 32 }><CustomIcon name="ExpandLess"/></StyledIcon>
    default:
      return <StyledIcon
        size={ 32 }
        iconUrl={ `${ env.VITE_AZA_FRONTEND_URL }/icons/chevron_up_down.svg` }
        inline
      />
  }
}

const ShowOtherAddressesButton: React.FC<Props> = ({ bagId, index }) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return <>
    <Button variant="blank" icon={ renderIcon(index) } onClick={ openModal } />
    <OtherAddressesModal bagId={ bagId } isOpen={ isModalOpen } closeModal={ closeModal } />
  </>
}

export default ShowOtherAddressesButton
