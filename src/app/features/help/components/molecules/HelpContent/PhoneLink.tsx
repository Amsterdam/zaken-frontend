import React from "react"
import { Link } from "@amsterdam/asc-ui"

type Props = {
  phoneNumber: string
}

const PhoneLink: React.FC<Props> = ({ phoneNumber }) => (<Link href={ `tel:${ phoneNumber }` }>{ phoneNumber }</Link>)
export default PhoneLink
