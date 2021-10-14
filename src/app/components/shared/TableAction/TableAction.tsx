import { Button, Hidden } from "@amsterdam/asc-ui"
import Tooltip from "@material-ui/core/Tooltip"
import { ChevronRight } from "../Icons"
import ButtonLink from "../ButtonLink/ButtonLink"

type Props = React.ComponentProps<typeof Button> & {
  to?: string
  disabled?: boolean
}

const TableAction: React.FC<Props> = ({ to, disabled = false, title, children, ...restProps }) => {

  const onClick = (event: React.MouseEvent) => event.stopPropagation()

  const isLink = to !== undefined && disabled === false

  const action = (
    <Tooltip title={disabled ? "U heeft geen rechten om deze actie uit te voeren" : ""}>
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
    </Tooltip>
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