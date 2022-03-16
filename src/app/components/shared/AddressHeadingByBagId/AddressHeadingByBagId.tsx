
import styled from "styled-components"
import { Heading, themeSpacing } from "@amsterdam/asc-ui"
import { useBAG } from "app/state/rest/"
import AddressDisplay from "app/components/addresses/AddressDisplay/AddressDisplay"


type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const Div = styled.div`
  margin-bottom: ${ themeSpacing(8) }
`

const AddressHeadingByBagId: React.FC<Props> = ({ bagId }) => {
  const [data] = useBAG(bagId)
  const address = data?.results[0]

  return (
    <>
      <Heading as="h3">Adres</Heading>
      { address &&
      <Div>
        <p><AddressDisplay streetName={ address.straatnaam } streetNumber={ address.huisnummer } suffix={ address.bag_huisletter } etage={ address.bag_toevoeging } /></p>
        <p>{ address.postcode } { address.woonplaats }</p>
      </Div>
      }
    </>
  )
}
export default AddressHeadingByBagId