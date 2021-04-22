

import { Fields } from "app/components/shared/Form/ScaffoldFields"
import ConfirmScaffoldForm from "app/components/shared/ConfirmScaffoldForm/ConfirmScaffoldForm"
import useNavigateWithFlashMessage from "app/state/flashMessages/useNavigateWithFlashMessage"

type Props = {
  id: Components.Schemas.Case["id"]
  fields?: { fields: Fields }
  postMethod: (data: any) => Promise<any>
  mapData?: (data: any) => any
  initialValues?: Record<string, unknown>
}

const WorkflowForm: React.FC<Props> = ({ id, fields, postMethod, mapData, initialValues = {} }) => {

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
      initialValues={ { case: id, ...initialValues } }
    />
  )
}

export default WorkflowForm
