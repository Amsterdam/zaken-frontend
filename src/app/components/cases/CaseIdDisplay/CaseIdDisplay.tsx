import React from "react"

type Props = {
  id?: Components.Schemas.Case["id"]
}

const CaseIdDisplay: React.FC<Props> = ({ id }) => {
  const IdPrefix = "WV-" //TODO make dynamic, based on teamId?
  const IdLength = 6

  return (
    <>
    {id ? 
      `${ IdPrefix }${ id.toString().padStart(IdLength, "0") }` : 
      "-" }
    </>
  )
}

export default CaseIdDisplay
