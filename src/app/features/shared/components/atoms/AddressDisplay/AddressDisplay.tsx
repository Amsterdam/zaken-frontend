import React from "react"

// Be careful
// ==========
// BWV data has the fields `suffix` and `suffix_letter`
// `suffix_letter` = `suffix`
// `suffix` = `etage`

type Props = {
  streetName: string
  streetNumber: string | number
  suffix?: string
  etage?: string | number
}

const AddressDisplay: React.FC<Props> = ({ streetName, streetNumber, suffix, etage }) =>
  <>{ `${ streetName } ${ streetNumber }${ suffix ? suffix : "" }${ etage ? `-${ etage }` : "" }`.trim() }</>
  
export default AddressDisplay
