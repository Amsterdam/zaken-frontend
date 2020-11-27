import React from "react"
import { Link } from "@datapunt/asc-ui"

type Props = {
  email: string
}

const EmailLink: React.FC<Props> = ({ email }) => (<Link href={ `mailto:${ email }` }>{ email }</Link>)
export default EmailLink
