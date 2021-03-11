import React from "react"
import { Button } from "@amsterdam/asc-ui"

import { useModal } from "app/components/shared/Modal/hooks/useModal"
import CamundaFormModal from "./CamundaFormModal"

type Props = {
  onSubmit: (variables: Components.Schemas.CamundaTaskComplete["variables"]) => Promise<unknown>
  taskName: string
  caseId: number 
  form: Components.Schemas.CamundaTask["form"]
}

const CamundaFormButton: React.FC<Props> = ({ onSubmit, taskName, caseId, form }) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return <>
    <Button variant="primary" onClick={ openModal } >Uitkomst</Button>
    <CamundaFormModal taskName={taskName} caseId={caseId} onSubmit={ onSubmit } isOpen={ isModalOpen } closeModal={ closeModal } form={ form } />
  </>
}

export default CamundaFormButton
