import { Spinner, Heading, Paragraph, themeColor } from "@amsterdam/asc-ui"
import { Link } from "@reach/router"

import to from "app/routing/utils/to"
import { usePermitDetails } from "app/state/rest"
import usePermitValues from "./hooks/usePermitValues"
import { DefinitionList } from "@amsterdam/wonen-ui"
import styled from "styled-components"

type Props = {
  bagId: string
}

const StyledLink = styled(Link)`
  color: ${ themeColor("primary") };
  font-size: 18px;
  &:hover {
    color: ${ themeColor("secondary") };
  }
`

const PermitOverview: React.FC<Props> = ({ bagId }) => {

  const [data, { isBusy }] = usePermitDetails(bagId)
  const values = usePermitValues(data)

  return (
    <>
      { isBusy ?
        <Spinner /> :
        <>
          { values === undefined ?
            <>
              <Heading forwardedAs="h2">Vergunningen</Heading>
              <Paragraph>Geen vergunningen gevonden</Paragraph>
            </> :
            <DefinitionList isLoading={ isBusy } numLoadingRows={ 2 } values={ values } title="Vergunningen" />
          }
          <StyledLink to={ to("/adres/:bagId/vergunningen", { bagId })} >Alle vergunningen details</StyledLink>
        </>
      }
    </>
  )
}
export default PermitOverview
