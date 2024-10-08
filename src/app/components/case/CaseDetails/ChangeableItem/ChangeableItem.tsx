import styled from "styled-components"
import { Icon, themeSpacing } from "@amsterdam/asc-ui"
import { Edit } from "app/components/shared/Icons"
import useHasPermission, { CAN_PERFORM_TASK } from "app/state/rest/custom/usePermissions/useHasPermission"

type Props = {
  name?: string
  titleAccess?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Span = styled.span`
  cursor: pointer;
  position: relative;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
  >span {
    position: absolute;
    bottom: 2px;
    left: 100%;
  }
`

const StyledIcon = styled(Icon)`
  display: inline-block;
  margin-left: ${ themeSpacing(1) };
`

const ChangeableItem = ({ name = "-", titleAccess = "", onClick }: Props) => {
  const [hasPermission] = useHasPermission([CAN_PERFORM_TASK])
  return hasPermission ? (
    <Span
      role="link"
      onClick={ onClick }
    >
      { name }
      <StyledIcon size={ 20 }>
        <Edit titleAccess={ titleAccess } />
      </StyledIcon>
    </Span>
  ) : <>{ name }</>
}

export default ChangeableItem
