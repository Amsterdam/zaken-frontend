import React from "react"

type Props = {
  id?: Components.Schemas.Case["id"] | Components.Schemas.Case["identification"]
}

const CaseIdDisplay: React.FC<Props> = ({ id }) => <>{ id ?? "-" }</>
export default CaseIdDisplay