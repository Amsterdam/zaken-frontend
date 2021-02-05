import React from "react"
import AddressDisplay from "../AddressDisplay/AddressDisplay"
import PostalCodeDisplay from "../PostalCodeDisplay/PostalCodeDisplay"

type Props = {
  streetName: string
  streetNumber: string | number
  suffix?: string
  etage?: string | number
  postalCode?: string
  city?: string
}

const FullAddressDisplay: React.FC<Props> = ({ streetName, streetNumber, suffix, etage, postalCode, city }) => (
  <>
    <AddressDisplay streetName={ streetName } streetNumber={ streetNumber } suffix={ suffix } etage={ etage } />
    { postalCode && <>, <PostalCodeDisplay postalCode={ postalCode } /></> }
    { city ? ` ${ city }` : "" }
  </>
)

export default FullAddressDisplay