import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import DebriefForm from "./DebriefForm"
import usePageDebriefing from "app/pages/case/debriefings/hooks/usePageDebriefing"

type Props = {
  id: Components.Schemas.Case["id"]
}

const DebriefCreateForm: React.FC<Props> = ({ id }) => {

  const { handleCreate } = usePageDebriefing(id)

  return (
    <>
      <FormTitle>Geef terugkoppeling van de gehouden debrief</FormTitle>
      <DebriefForm caseId={ id } onSubmit={ handleCreate } />
    </>
  )
}

export default DebriefCreateForm