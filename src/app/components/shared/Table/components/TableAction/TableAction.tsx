import { Button, Hidden } from "@amsterdam/asc-ui"
import { ChevronRight } from "app/components/shared/Icons"
import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"

type Props = React.ComponentProps<typeof Button> & {
  to?: string
}

const TableAction: React.FC<Props> = ({ to, children, ...restProps }) => {

  const onClick = (event: React.MouseEvent) => event.stopPropagation()

  const action = (
    <Button variant="textButton" as={ to ? "span" : "button" } iconLeft={ <ChevronRight /> } iconSize={ 24 } { ...restProps }>
      <Hidden maxBreakpoint="laptopM">
        <span>
          { children }
        </span>
      </Hidden>
    </Button>
  )

  return (
    to !== undefined ?
      <ButtonLink to={ to } onClick={ onClick }>
        { action }
      </ButtonLink> :
      action
  )
}

export default TableAction