import { FC } from "react"

import { Fields } from "app/components/shared/Form/ScaffoldFields"
import ConfirmScaffoldForm from "app/components/shared/ConfirmScaffoldForm/ConfirmScaffoldForm"
import { Spinner } from "@amsterdam/asc-ui"
import useNavigateWithFlashMessage from "app/state/flashMessages/useNavigateWithFlashMessage"

type Props = {
  id: Components.Schemas.Case["id"]
  fields?: { fields: Fields }
  postMethod: (data: any) => Promise<any>
  initialValues?: Record<string, unknown>
}

const WorkflowForm: FC<Props> = ({ id, fields, postMethod, initialValues = {} }) => {

  const navigateWithFlashMessage = useNavigateWithFlashMessage()
  const afterSubmit = async () => await navigateWithFlashMessage(
    "/zaken/:id",
    { id },
    "info",
    "Succes",
    "Het resultaat is verwerkt"
  )

  if (fields === undefined) return <Spinner />

  return (
    <ConfirmScaffoldForm
      fields={ fields }
      postMethod={ postMethod }
      afterSubmit={ afterSubmit }
      initialValues={ { case: id, ...initialValues } }
    />
  )
}

export default WorkflowForm
