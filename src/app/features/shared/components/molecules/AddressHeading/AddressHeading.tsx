import React from "react"
import { Heading, themeSpacing } from "@amsterdam/asc-ui"
import { useCase } from "app/state/rest/"
import AddressDisplay from "app/features/shared/components/atoms/AddressDisplay/AddressDisplay"
import styled from "styled-components"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const Div = styled.div`
  margin-bottom: ${ themeSpacing(7) }
`

const AddressHeading: React.FC<Props> = ({ caseId }) => {
  const { data } = useCase(caseId)

  return (
    <>
      <Heading as="h3">Adres</Heading>
      { data &&
        <Div>
          <p><AddressDisplay streetName={ data.address.street_name } streetNumber={ data.address.number } suffix={ data.address.suffix_letter } etage={ data.address.suffix } /></p>
          <p>{ data.address.postal_code } Amsterdam</p>
        </Div>
      }
    </>
  )
}
export default AddressHeading
