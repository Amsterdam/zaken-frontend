

import { Fields } from "app/components/shared/Form/ScaffoldFields"
import ConfirmScaffoldForm from "app/components/shared/ConfirmScaffoldForm/ConfirmScaffoldForm"
import useNavigateWithFlashMessage from "app/state/flashMessages/useNavigateWithFlashMessage"

type Rec = Record<string, any>
type Props<T, U, V> = {
  id: Components.Schemas.Case["id"]
  fields?: { fields: Fields }
  mapData?: (data: T) => U
  postMethod: (data: U) => Promise<V>
  initialValues?: Record<string, unknown>
}

const WorkflowForm = <T extends Rec, U extends Rec, V extends Rec>(props: Props<T, U, V>) => {
  const { id, fields, postMethod, mapData, initialValues = {} } = props

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
