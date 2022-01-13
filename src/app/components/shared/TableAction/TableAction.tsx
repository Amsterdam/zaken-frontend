import { Button, Hidden } from "@amsterdam/asc-ui"
import { ChevronRight } from "../Icons"
import ButtonLink from "../ButtonLink/ButtonLink"
import CustomTooltip from "app/components/help/HelpContent/CustomTooltip"

type Props = React.ComponentProps<typeof Button> & {
  to?: string
  disabled?: boolean
}

const TableAction: React.FC<Props> = ({ to, disabled = false, children, ...restProps }) => {

  const onClick = (event: React.MouseEvent) => event.stopPropagation()

  const isLink = to !== undefined && disabled === false

  const action = (
    <CustomTooltip title={disabled ? "U heeft geen rechten om deze actie uit te voeren" : ""}>
      <span>
        <Button
          variant="textButton"
          as={ isLink ? "span" : "button" }
          disabled={ disabled }
          iconLeft={ <ChevronRight /> }
          iconSize={ 24 }
          { ...restProps }
          style={ disabled ? { pointerEvents: "none" } : {} } // https://mui.com/components/tooltips/#disabled-elements
        >
          <Hidden maxBreakpoint="laptopM">
            <span>
              { children }
            </span>
          </Hidden>
        </Button>
      </span>
    </CustomTooltip>
  )

  return (
    isLink ? (
      <ButtonLink to={ to! } onClick={ onClick } flex>
        { action }
      </ButtonLink>
    ) : action
  )
}

export default TableAction