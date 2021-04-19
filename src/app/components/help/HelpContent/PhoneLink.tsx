import { FC } from "react"
import { Link } from "@amsterdam/asc-ui"

type Props = {
  phoneNumber: string
}

const PhoneLink: FC<Props> = ({ phoneNumber }) => (<Link href={ `tel:${ phoneNumber }` }>{ phoneNumber }</Link>)
export default PhoneLink
