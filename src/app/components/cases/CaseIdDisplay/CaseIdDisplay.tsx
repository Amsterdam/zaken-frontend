import React from "react"

type Props = {
  id?: Components.Schemas.Case["id"]
}

const CaseIdDisplay: React.FC<Props> = ({ id }) => {
  const idLength = 6
  return <>{ id?.toString().padStart(idLength, "0") ?? "-" }</>
}

export default CaseIdDisplay
