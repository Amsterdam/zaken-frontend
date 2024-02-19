
import { useState } from "react"
import { PermitsSynopsis } from "@amsterdam/wonen-ui"
import { Heading, Switch, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"
import { usePermitsPowerBrowser } from "app/state/rest"


const StyledSpan = styled.span`
  color: ${ themeColor("tint","level5") };
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
`

const StyledSwitch = styled(Switch)`
  margin-left: ${ themeSpacing(2) };
`

type Props = {
  bagId: string
}


const PermitsPowerBrowser: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = usePermitsPowerBrowser(bagId)
  const [isChecked, setIsChecked] = useState(false)
  const permits: any = data || []
  return (
    <>
      <Heading forwardedAs="h4">
        Vergunningen PowerBrowser
        { permits.length > 0 && (
          <StyledSpan>
            Alles tonen
            <StyledSwitch
              aria-label="This is a checkbox!"
              data-testid="checkBox_display_all_permts"
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                setIsChecked(e.target.checked)
              } }

            />
          </StyledSpan>
        )}
      </Heading>
      <PermitsSynopsis
        permits={ permits }
        loading={ isBusy }
        displayOnlyValidPermits={ !isChecked }
      />
    </>
  )
}

export default PermitsPowerBrowser
