import { Button, Hidden } from "@amsterdam/asc-ui"
import ButtonLink from "../ButtonLink/ButtonLink"
import CustomTooltip from "app/components/help/HelpContent/CustomTooltip"
import CustomIcon from "../CustomIcon/CustomIcon"
import styled from "styled-components"

type Props = React.ComponentProps<typeof Button> & {
  to?: string
  disabled?: boolean
  onClick?: () => void
}

const ButtonWrapper = styled.span`
  display: flex;
  align-items: center;
  height: 100%;
`

const TableAction: React.FC<Props> = ({
  to,
  disabled = false,
  onClick,
  children
}) => {
  const isLink = to !== undefined && disabled === false

  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      onClick()
    }
    event.stopPropagation()
  }

  const actionButton = (
    <CustomTooltip
      title={disabled ? "U heeft geen rechten om deze actie uit te voeren" : ""}
    >
      <Button
        variant="textButton"
        as={isLink ? "span" : "button"}
        disabled={disabled}
        iconLeft={<CustomIcon name="ChevronRight" />}
        onClick={handleClick}
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
      onClick={handleClick}
      flex
    >
      {actionButton}
    </ButtonLink>
  ) : (
    <ButtonWrapper>{actionButton}</ButtonWrapper>
  )
}

export default TableAction
