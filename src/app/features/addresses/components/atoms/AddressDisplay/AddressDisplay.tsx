import React from "react"
import { useBAG } from "app/state/rest"
import { Heading } from "@datapunt/asc-ui"

type Props = {
  bagId: string
}

const AddressDisplay: React.FC<Props> = ({ bagId }) => {
  const { data } = useBAG(bagId)
  // TODO: Show loading status visually
  return <Heading>{ data ? `${ data.results[0].adres }, ${ data.results[0].postcode }` : "" }</Heading>
}
export default AddressDisplay
