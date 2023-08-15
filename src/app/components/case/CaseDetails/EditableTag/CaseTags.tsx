
import styled, { keyframes } from "styled-components"
import { Icon, Tag, themeSpacing } from "@amsterdam/asc-ui"
import { Edit } from "app/components/shared/Icons"


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

const StyledTag = styled(Tag)`
  margin-right: ${ themeSpacing(2) };
  animation: 0.5s ${ fadeIn } cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`

const StyledIcon = styled(Icon)`
  display: inline-block;
  vertical-align: middle;
  margin-left: ${ themeSpacing(1) };
  cursor: pointer;
`

const CaseTags: React.FC<Props> = ({ tags = [], titleAccess = "Wijzig tag", onClick }) => (
  <ClickableSpan
    role="link"
    onClick={ onClick }
  >
    { tags.map(tag => <StyledTag colorType="tint" colorSubtype="level3" key={ tag.id }>{ tag.name }</StyledTag>)}
    <StyledIcon size={ 20 }>
      <Edit titleAccess={ titleAccess } />
    </StyledIcon>
  </ClickableSpan>
)

export default CaseTags
