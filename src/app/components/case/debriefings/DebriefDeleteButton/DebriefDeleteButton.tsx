import React from "react"
import { Button } from "@amsterdam/asc-ui"

import usePageDebriefing from "app/pages/case/debriefings/hooks/usePageDebriefing"
import { Delete } from "app/components/shared/Icons"

type Props = {
  id: Components.Schemas.Case["id"]
  debriefingId: Components.Schemas.Debriefing["id"]
}

const CONFIRM_TEXT = "Weet je zeker dat je deze debriefing wilt verwijderen?"
const BUTTON_TEXT = "Terugkoppeling verwijderen"

const DebriefDeleteButton: React.FC<Props> = ({ id, debriefingId }) => {

  const { handleDelete } = usePageDebriefing(id, debriefingId)
  const onDelete = () => {
    if (!window.confirm(CONFIRM_TEXT)) return
    handleDelete()
  }

  return <Button variant="primaryInverted" iconLeft={ <Delete /> } onClick={ onDelete }>{ BUTTON_TEXT }</Button>
}

export default DebriefDeleteButton