import { FC } from "react"
import formatPostalCode from "./utils/formatPostalCode"

type Props = {
  postalCode: string
}

const PostalCodeDisplay: FC<Props> = ({ postalCode }) =>
  <>{ `${ formatPostalCode(postalCode) }` }</>

export default PostalCodeDisplay