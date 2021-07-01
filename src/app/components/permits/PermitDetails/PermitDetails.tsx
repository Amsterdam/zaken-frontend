import styled from "styled-components"
import { themeSpacing, Icon } from "@amsterdam/asc-ui"
import { Check, Close } from "app/components/shared/Icons"
import useValues from "./hooks/useValues"
import { DefinitionList } from "@amsterdam/wonen-ui"

type Props = {
  permit: Components.Schemas.Permit
}

const Div = styled.div<{ isOpaque?: boolean }>`
  margin-bottom: ${ themeSpacing(8) };
  dl {
    opacity: ${ ({ isOpaque = true }) => isOpaque ? 1 : 0.3 };
  }
`

const HeadingSpan = styled.span`
  display: flex;
  justify-content: start;
  align-items: center;
`

const StyledIcon = styled(Icon)`
  margin-left: ${ themeSpacing(2) };
`

const PermitDetail: React.FC<Props> = ({ permit }) => {

  const values = useValues(permit)
  const { permit_type, permit_granted } = permit
  const isGranted = permit_granted === "GRANTED"

  return (
    <Div isOpaque={ isGranted }>
      <DefinitionList
        title={
          <HeadingSpan>
            { permit_type } <StyledIcon>{ isGranted ? <Check /> : <Close /> }</StyledIcon>
          </HeadingSpan>
        }
        headingSize="h4"
        values={ values }
      />
    </Div>
  )
}
export default PermitDetail
