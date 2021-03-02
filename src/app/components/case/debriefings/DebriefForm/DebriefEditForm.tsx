import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"

import { useDebriefings } from "app/state/rest"
import usePageDebriefing from "app/pages/case/debriefings/hooks/usePageDebriefing"
import DebriefForm from "./DebriefForm"

type Props = {
  id: Components.Schemas.Case["id"]
  debriefingId: Components.Schemas.Debriefing["id"]
}

const DebriefEditForm: React.FC<Props> = ({ id, debriefingId }) => {

  const [data, { isBusy }] = useDebriefings(debriefingId)
  const { handleUpdate } = usePageDebriefing(id, debriefingId)

  return (
    <>
      <FormTitle>Wijzig de terugkoppeling van de gehouden debrief</FormTitle>
      <DebriefForm caseId={ id } onSubmit={ handleUpdate } initialValues={ data } isLoading={ isBusy } />
    </>
  )
}

export default DebriefEditForm