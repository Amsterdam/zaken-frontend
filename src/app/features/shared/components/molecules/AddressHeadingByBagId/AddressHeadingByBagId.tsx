import React from "react"
import { Heading } from "@amsterdam/asc-ui"
import { useBAG } from "app/state/rest/"
import AddressDisplay from "app/features/shared/components/atoms/AddressDisplay/AddressDisplay"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const AddressHeadingByBagId: React.FC<Props> = ({ bagId }) => {
  const { data } = useBAG(bagId)
  const address = data?.results[0]

  return (
    <>
      <Heading as="h3">Adres</Heading>
      { address &&
        <>
          <p><AddressDisplay streetName={ address.straatnaam } streetNumber={ address.huisnummer } suffix={ address.bag_huisletter } etage={ address.bag_toevoeging } /></p>
          <p>{ address.postcode } { address.woonplaats }</p>
        </>
      }
    </>
  )
}
export default AddressHeadingByBagId