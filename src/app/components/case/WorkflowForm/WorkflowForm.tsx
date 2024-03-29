import { Fields } from "app/components/shared/Form/ScaffoldFields"
import ConfirmScaffoldForm from "app/components/shared/ConfirmScaffoldForm/ConfirmScaffoldForm"
import useNavigateWithFlashMessage from "app/state/flashMessages/useNavigateWithFlashMessage"

type Rec = Record<string, any>
type Props<T, U> = {
  id: Components.Schemas.CaseDetail["id"]
  fields?: { fields: Fields }
  mapData?: (data: T) => U
  postMethod: (data: U) => Promise<any>
  initialValues?: Record<string, unknown>
  caseUserTaskId?: Components.Schemas.CaseUserTaskWorkdflow["case_user_task_id"]
}

const WorkflowForm = <T extends Rec, U extends Rec>(props: Props<T, U>) => {
  const { id, fields, postMethod, mapData, caseUserTaskId, initialValues = {} } = props

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
      initialValues={ { case: id, case_user_task_id: caseUserTaskId, ...initialValues } }
    />
  )
}

export default WorkflowForm
