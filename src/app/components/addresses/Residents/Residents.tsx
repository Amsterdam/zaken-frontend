
import styled from "styled-components"
import { themeSpacing, Heading } from "@amsterdam/asc-ui"

import { useResidents } from "app/state/rest"
import LoadingDetails from "app/components/shared/Details/LoadingDetails"
import Resident from "app/components/addresses/Residents/Resident"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const Ul = styled.ul`
  margin-top: ${ themeSpacing(8) };
  padding: 0;
  list-style: none;

  li {
    margin-bottom: ${ themeSpacing(14) };
  }
`

const Residents: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = useResidents(bagId)
  const residents: any = data?._embedded?.ingeschrevenpersonen ?? []

  if (isBusy) {
    return <LoadingDetails numRows={4} />
  }
  return (
    <>
      { residents.length > 0 ? (
        <>
          <Heading as="h2">Actueel ingeschreven personen ({ residents.length })</Heading>
          <Ul>
            {residents.map((resident: any, index: number) => (
              <Resident resident={ resident } key={ index } num={ index + 1 } />
              )
            )}
          </Ul>
        </>
        ) : <Heading as="h2">Er zijn geen ingeschreven personen op dit adres</Heading>
      }
    </>
  )
}
export default Residents
