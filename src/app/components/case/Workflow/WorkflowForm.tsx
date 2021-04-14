import { FC } from "react"

import { Fields } from "app/components/shared/Form/ScaffoldFields"
import ConfirmScaffoldForm from "app/components/shared/ConfirmScaffoldForm/ConfirmScaffoldForm"
import { Spinner } from "@amsterdam/asc-ui"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import navigateTo from "app/routing/navigateTo"

type Props = {
  id: Components.Schemas.Case["id"]
  fields?: { fields: Fields }
  postMethod: (data: any) => Promise<any>
  initialValues?: Record<string, unknown>
}

const WorkflowForm: FC<Props> = ({ id, fields, postMethod, initialValues }) => {

  const { addSuccessFlashMessage } = useFlashMessages()

  if (fields === undefined) return <Spinner />

  const afterSubmit = async () => {
    const path = `/zaken/${ id }`
    addSuccessFlashMessage(path, "Succes", "Het resultaat is verwerkt")
    navigateTo("/zaken/:id", { id })
  }

  return (
    <ConfirmScaffoldForm
      fields={ fields }
      postMethod={ postMethod }
      afterSubmit={ afterSubmit }
      initialValues={ { case: id, ...initialValues ?? {} } }
    />
  )
}

export default WorkflowForm
