import { Button, Hidden } from "@amsterdam/asc-ui"
import ButtonLink from "../ButtonLink/ButtonLink"
import CustomTooltip from "app/components/help/HelpContent/CustomTooltip"
import CustomIcon from "../CustomIcon/CustomIcon"
import styled from "styled-components"

type Props = React.ComponentProps<typeof Button> & {
  to?: string
  disabled?: boolean
}

const ButtonWrapper = styled.span`
  display: flex;
  align-items: center;
  height: 100%;
`

const TableAction: React.FC<Props> = ({ to, disabled = false, children }) => {
  const isLink = to !== undefined && disabled === false

  const actionButton = (
    <CustomTooltip
      title={disabled ? "U heeft geen rechten om deze actie uit te voeren" : ""}
    >
      <Button
        variant="textButton"
        as={isLink ? "span" : "button"}
        disabled={disabled}
        iconLeft={<CustomIcon name="ChevronRight" />}
      >
        <Hidden maxBreakpoint="laptopM">
          <span>{children}</span>
        </Hidden>
      </Button>
    </CustomTooltip>
  )

  return to ? (
    <ButtonLink
      to={to!}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      flex
    >
      {actionButton}
    </ButtonLink>
  ) : (
    <ButtonWrapper>{actionButton}</ButtonWrapper>
  )
}

export default TableAction
