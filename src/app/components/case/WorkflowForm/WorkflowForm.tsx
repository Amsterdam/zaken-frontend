

import { Fields } from "app/components/shared/Form/ScaffoldFields"
import ConfirmScaffoldForm from "app/components/shared/ConfirmScaffoldForm/ConfirmScaffoldForm"
import useNavigateWithFlashMessage from "app/state/flashMessages/useNavigateWithFlashMessage"

type Rec = Record<string, any>
type Props<T, U> = {
  id: Components.Schemas.Case["id"]
  fields?: { fields: Fields }
  mapData?: (data: T) => U
  postMethod: (data: U) => Promise<any>
  initialValues?: Record<string, unknown>
  camundaTaskId: Components.Schemas.CamundaTask["camunda_task_id"]
}

const WorkflowForm = <T extends Rec, U extends Rec>(props: Props<T, U>) => {
  const { id, fields, postMethod, mapData, camundaTaskId, initialValues = {} } = props

  const navigateWithFlashMessage = useNavigateWithFlashMessage()
  const afterSubmit = async () => await navigateWithFlashMessage(
    "/zaken/:id",
    { id },
    "info",
    "Succes",
    "Het resultaat is verwerkt"
  )

  return (
    <ConfirmScaffoldForm
      fields={ fields }
      postMethod={ postMethod }
      mapData={ mapData }
      afterSubmit={ afterSubmit }
      initialValues={ { case: id, camunda_task_id: camundaTaskId, ...initialValues } }
    />
  )
}

export default WorkflowForm
