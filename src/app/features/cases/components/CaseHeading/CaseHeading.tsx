import React from "react"
import { Heading, Spinner } from "@amsterdam/asc-ui"
import CaseIdDisplay from "../CaseIdDisplay/CaseIdDisplay"
import { useCase } from "app/state/rest"

type Props = {
  id: Components.Schemas.Case["id"]
}

const CaseHeading: React.FC<Props> = ({ id }) => {

  const { data } = useCase(id)

  return (
    <>
      <Heading as="h3">Zaak Id</Heading>
      { data?.identification === undefined ?
        <Spinner /> :
        <p><CaseIdDisplay id={ data?.identification } /></p>
      }
    </>
  )
}
export default CaseHeading