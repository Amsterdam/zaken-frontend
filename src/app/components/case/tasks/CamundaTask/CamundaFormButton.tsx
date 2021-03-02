import React from "react"
import { Button } from "@amsterdam/asc-ui"

import { useModal } from "app/components/shared/Modal/hooks/useModal"
import CamundaFormModal from "./CamundaFormModal"

type Props = {
  onSubmit: (data: Components.Schemas.CamundaTaskComplete) => Promise<unknown>
  taskName: string
  form: Components.Schemas.CamundaTask["form"]
}

const CamundaFormButton: React.FC<Props> = ({ onSubmit, taskName, form }) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return <>
    <Button variant="primary" onClick={ openModal } >Camunda afronden</Button>
    <CamundaFormModal taskName={taskName} onSubmit={ onSubmit } isOpen={ isModalOpen } closeModal={ closeModal } form={ form } />
  </>
}

export default CamundaFormButton
