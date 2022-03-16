
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
  const [residents] = useResidents(bagId)

  return (
    <>
      { residents ?
        <>
          <Heading as="h2">Actueel ingeschreven personen ({ residents.results.length })</Heading>
          <Ul>
            { residents.results
              .map((resident, index) =>
                <li key={ index }><Resident resident={ resident } num={ index + 1 }/></li>)
          }
          </Ul>
        </>
        :
        <LoadingDetails numRows={4} />
      }
    </>
  )
}
export default Residents
