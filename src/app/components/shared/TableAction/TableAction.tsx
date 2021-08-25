import { Button, Hidden } from "@amsterdam/asc-ui"
import { ChevronRight } from "../Icons"
import ButtonLink from "../ButtonLink/ButtonLink"

type Props = React.ComponentProps<typeof Button> & {
  to?: string
  disabled?: boolean
}

const TableAction: React.FC<Props> = ({ to, disabled = false, children, ...restProps }) => {

  const onClick = (event: React.MouseEvent) => event.stopPropagation()

  const isLink = to !== undefined && disabled === false

  const action = (
    <Button variant="textButton" as={ isLink ? "span" : "button" } disabled={ disabled } iconLeft={ <ChevronRight /> } iconSize={ 24 } { ...restProps }>
      <Hidden maxBreakpoint="laptopM">
        <span>
          { children }
        </span>
      </Hidden>
    </Button>
  )

  return (
    isLink ?
      <ButtonLink to={ to! } onClick={ onClick }>
        { action }
      </ButtonLink> :
      action
  )
}

export default TableAction