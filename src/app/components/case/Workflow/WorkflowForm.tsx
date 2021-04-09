import { FC } from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import { Fields } from "app/components/shared/Form/ScaffoldFields"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import { Spinner } from "@amsterdam/asc-ui"
import ConfirmScaffoldFields from "app/components/shared/ConfirmScaffoldFields/ConfirmScaffoldFields"
import useSubmitConfirmation from "app/components/shared/ConfirmScaffoldFields/hooks/useSubmitConfirmation"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import navigateTo from "app/routing/navigateTo"

type Props = {
  caseId: Components.Schemas.Case["id"]
  scaffold: (caseId: Components.Schemas.Case["id"], data: any, extraLabel?: string) => { fields: Fields }
  hasScaffoldData?: boolean
  scaffoldData?: unknown
  extraLabel?: string
  postMethod: (data: any) => Promise<unknown>
  initialValues?: unknown
}

const DEFAULT_SUBMIT_TITLE = "Resultaat verwerken"

const WorkflowForm: FC<Props> = ({ caseId, scaffold, hasScaffoldData = false, scaffoldData, extraLabel, postMethod, initialValues }) => {

  const {
    isSubmitted,
    data: confirmData,
    onSubmit,
    onSubmitConfirm,
    onCancelConfirm
  } = useSubmitConfirmation<any>(postMethod)
  const { addSuccessFlashMessage } = useFlashMessages()

  if (hasScaffoldData && scaffoldData === undefined) return <Spinner />

  const fields = scaffold(caseId, scaffoldData, extraLabel)
  const submitTitle = fields.fields.submit.props.label ?? DEFAULT_SUBMIT_TITLE

  const onSubmitConfirmWrap = async () => {
    const result = await onSubmitConfirm()
    if (result === undefined) return
    const path = `/zaken/${ caseId }`
    addSuccessFlashMessage(path, "Succes", "Het resultaat is verwerkt")
    navigateTo("/zaken/:id", { id: caseId })
  }

  return (
    <ScaffoldForm onSubmit={ onSubmit } initialValues={ initialValues }>
      <ScaffoldFields { ...fields } />
      { isSubmitted &&
        <ConfirmScaffoldFields<typeof fields.fields>
          fields={ fields.fields }
          data={ confirmData }
          showFields={ Object.keys(fields.fields) }
          onCancel= { onCancelConfirm }
          onSubmit={ onSubmitConfirmWrap }
          submitTitle= { submitTitle }
          showInModal={ true }
        />
      }
    </ScaffoldForm>
  )
}

export default WorkflowForm
