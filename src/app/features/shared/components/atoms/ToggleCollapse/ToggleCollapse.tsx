import React from "react"
import { Button, themeSpacing } from "@datapunt/asc-ui"
import { ButtonVariant } from "@datapunt/asc-ui/lib/components/Button/Button"
import styled from "styled-components"

type Props = Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  clickHandler: () => void
  isCollapsed: boolean
  displayInline? : boolean
  buttonVariant?: ButtonVariant
  textToOpen?: string
  textToClose?: string
}

const StyledButton = styled(Button)`
  margin-bottom: ${ themeSpacing(5) };
`

const ToggleCollapse: React.FC<Props> = (
  { clickHandler, 
    isCollapsed, 
    buttonVariant = "textButton", 
    textToOpen = "+ Toon alle", 
    textToClose = "- Toon minder"  
  }) => (
    <StyledButton onClick={ clickHandler } variant={buttonVariant} >{ isCollapsed ? textToOpen : textToClose }</StyledButton>
  ) 

export default ToggleCollapse
