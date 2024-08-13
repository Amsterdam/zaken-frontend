
import styled, { keyframes } from "styled-components"
import { Icon, themeSpacing } from "@amsterdam/asc-ui"
import { Edit } from "app/components/shared/Icons"
import useHasPermission, { CAN_PERFORM_TASK } from "app/state/rest/custom/usePermissions/useHasPermission"


type Props = {
  tags: Components.Schemas.Tag[]
  name?: string
  titleAccess?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const fadeIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

const ClickableSpan = styled.span`
  cursor: pointer;
`

const Tag = styled.span`
  background-color: #f9f9f9;
  padding: 0 0.5em;
  font-family: "Nimbus Mono PS", "Courier New", monospace;
  border: 1px solid #eee;
  border-radius: 2px;
  margin-right: ${ themeSpacing(2) };
  animation: 0.5s ${ fadeIn } cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`

const StyledIcon = styled(Icon)`
  display: inline-block;
  vertical-align: middle;
  margin-left: ${ themeSpacing(1) };
  cursor: pointer;
`

const CaseTags: React.FC<Props> = ({ tags = [], titleAccess = "Wijzig tag", onClick }) => {
  const [hasPermission] = useHasPermission([CAN_PERFORM_TASK])
  return hasPermission ? (
    <ClickableSpan
      role="link"
      onClick={ onClick }
    >
      { tags.map(tag => <Tag key={ tag.id }>{ tag.name }</Tag>)}
      <StyledIcon size={ 20 }>
        <Edit titleAccess={ titleAccess } />
      </StyledIcon>
    </ClickableSpan>
  ) : <>{ tags.length > 0 ? tags.map(tag => <Tag key={ tag.id }>{ tag.name }</Tag>) : "-"}</>
}

export default CaseTags
