import { Button, Hidden } from "@amsterdam/asc-ui"
import { ChevronRight } from "app/components/shared/Icons"
import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"

type Props = React.ComponentProps<typeof Button> & {
  to?: string
}

const TableAction: React.FC<Props> = ({ to, children, ...restProps }) => {

  const onClick = (event: React.MouseEvent) => event.stopPropagation()

  const isAnchor = to !== undefined && restProps.disabled === false

  const action = (
    <Button variant="textButton" as={ isAnchor ? "span" : "button" } iconLeft={ <ChevronRight /> } iconSize={ 24 } { ...restProps }>
      <Hidden maxBreakpoint="laptopM">
        <span>
          { children }
        </span>
      </Hidden>
    </Button>
  )

  return (
    isAnchor ?
      <ButtonLink to={ to! } onClick={ onClick }>
        { action }
      </ButtonLink> :
      action
  )
}

export default TableAction