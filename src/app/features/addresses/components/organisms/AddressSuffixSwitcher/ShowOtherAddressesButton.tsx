import React from "react"
import { ChevronDown, ChevronUp } from "@datapunt/asc-assets"
import { Button, Icon, themeSpacing } from "@datapunt/asc-ui"

import { useModal } from "app/features/shared/components/molecules/Modal/hooks/useModal"
import OtherAddressesModal from "./OtherAddressesModal"
import styled from "styled-components"

type Props = {
  bagId: string
  index: "first" | "last" | undefined
}

const StyledButton = styled(Button)`
  margin-left: ${ themeSpacing(3) }
`

const StyledIcon = styled(Icon)`
  position: absolute;
  top: -6px;
  left: -6px;
`
const ShowOtherAddressesButton: React.FC<Props> = ({ bagId, index }) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  
  const renderIcon = (index: string | undefined) => {
    switch(index) {
      case "first":
        return <ChevronDown/>
        case "last":
          return <ChevronUp/>
        default:
        return <StyledIcon
        inline
        size={32}
        iconUrl={`${ process.env.PUBLIC_URL }/icons/chevron_up_down.svg`}
      />
    }
  }

  return <>
    <StyledButton variant="blank" icon={ renderIcon(index) } onClick={openModal} />
    <OtherAddressesModal bagId={bagId} isOpen={isModalOpen} closeModal={closeModal} />
  </>
}

export default ShowOtherAddressesButton
