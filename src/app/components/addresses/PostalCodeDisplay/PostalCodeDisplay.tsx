
import formatPostalCode from "./utils/formatPostalCode"

type Props = {
  postalCode: string
}

const PostalCodeDisplay: React.FC<Props> = ({ postalCode }) =>
  <>{ `${ formatPostalCode(postalCode) }` }</>

export default PostalCodeDisplay