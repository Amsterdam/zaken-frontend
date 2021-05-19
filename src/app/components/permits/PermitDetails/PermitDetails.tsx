import styled from "styled-components"
import { themeSpacing, Icon } from "@amsterdam/asc-ui"
import { Check, Close } from "app/components/shared/Icons"
import useValues from "./hooks/useValues"
import DefinitionList from "app/components/shared/DefinitionList/DefinitionList"

type Props = {
  permit: Components.Schemas.Permit
}

const Div = styled.div`
  margin-bottom: ${ themeSpacing(8) };
`

const HeadingSpan = styled.span`
  display: flex;
  justify-content: start;
`

const StyledIcon = styled(Icon)`
  margin-left: ${ themeSpacing(2) };
`

const PermitDetail: React.FC<Props> = ({ permit }) => {

  const values = useValues(permit)
  const { permit_type, permit_granted } = permit

  return (
    <Div>
      <DefinitionList
        title={
          <HeadingSpan>
            { permit_type } <StyledIcon>{ permit_granted === "GRANTED" ? <Check /> : <Close /> }</StyledIcon>
          </HeadingSpan>
        }
        headingSize="h4"
        values={ values }
      />
    </Div>
  )
}
export default PermitDetail
