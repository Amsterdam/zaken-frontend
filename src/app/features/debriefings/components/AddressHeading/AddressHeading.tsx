import React from "react"
import { Heading } from "@amsterdam/asc-ui"
import { useCase } from "app/state/rest/"
import AddressDisplay from "app/features/shared/components/atoms/AddressDisplay/AddressDisplay"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const AddressHeading: React.FC<Props> = ({ caseId }) => {
  const { data } = useCase(caseId)

  return (
    <>
      <Heading as="h3">Adres</Heading>
      { data &&
        <>
          <p><AddressDisplay streetName={ data.address.street_name } streetNumber={ data.address.number } suffix={ data.address.suffix_letter } etage={ data.address.suffix } /></p>
          <p>{ data.address.postal_code }</p>
        </>
      }
    </>
  )
}
export default AddressHeading
