
import styled from "styled-components"
import { themeSpacing, Spinner, Heading, Paragraph } from "@amsterdam/asc-ui"

import { usePermitDetails } from "app/state/rest"
import useKnownPermits from "./hooks/useKnownPermits"
import PermitDetails from "./PermitDetails"

type Props = {
  bagId: string
}

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin-bottom: ${ themeSpacing(8) };
  }
`

const PermitDetailsList: React.FC<Props> = ({ bagId }) => {

  const [data, { isBusy }] = usePermitDetails(bagId)
  const permits = useKnownPermits(data)

  return (
    <>
      { isBusy ?
          <Spinner /> :
        permits === undefined ?
          <>
            <Heading forwardedAs="h4">Vergunningen</Heading>
            <Paragraph>Geen vergunningen gevonden</Paragraph>
          </> :
          <Ul>
            { permits.map(permit => (
                <li key={ permit.permit_type }>
                  <PermitDetails detail={ permit } />
                </li>
              ))
            }
          </Ul>
      }
    </>
  )
}

export default PermitDetailsList
