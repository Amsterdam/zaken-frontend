import React from "react"
import styled from "styled-components"
import {    breakpoint, Button } from "@datapunt/asc-ui"

import { displayDate, displayTime } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"

import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"


import { EditDocument } from "@datapunt/asc-assets"

type Props = {
  target: string
  disabled: boolean
  editable_until: string
}

const ButtonWrap = styled.div`
  @media ${ breakpoint("min-width", "laptop") } {
    position: absolute;
    bottom: 20px;
    right: 20px;


  }
`
const StyledButton = styled(Button)`
  background-color: transparent;

  &:disabled {
    background-color: transparent;
  }
`

const ButtonEditEvent: React.FC<Props> = ({ target, disabled = false, editable_until }) => {
    const editableUntilText = `Wijzigen mogelijk tot ${ displayDate(editable_until) } ${ displayTime(editable_until) } uur`
    const button = <StyledButton size={60} variant="blank" iconSize={32} icon={<EditDocument /> } disabled={disabled} title={editableUntilText} />
  
    return (
      <ButtonWrap>
        { 
        !disabled ?
          <ButtonLink to={ target } >
            <>{ button }</>
          </ButtonLink>
          :
          <>{ button }</>
        }
      </ButtonWrap>
    )
  }

  export default ButtonEditEvent