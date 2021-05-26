import { Spinner } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import ScaffoldFields, { Fields } from "app/components/shared/Form/ScaffoldFields"
import ConfirmScaffoldFields from "./ConfirmScaffoldFields"
import useSubmitConfirmation from "./hooks/useSubmitConfirmation"

type Rec = Record<string, any>
type Props<T, U, V> = {
  fields: { fields: Fields } | undefined
  mapData?: (data: T) => U
  // TODO: Specify return type instead of any
  postMethod: (data: U) => Promise<any>
  afterSubmit?: (result: V) => Promise<unknown>
  initialValues?: Record<string, unknown>
  submittingTitle?: string
}


const ConfirmScaffoldForm = <T extends Rec, U extends Rec, V extends Rec>(props: Props<T, U, V>) => {

  const { fields, postMethod, mapData, afterSubmit, initialValues, submittingTitle } = props
  const {
    isSubmitted,
    data,
    onSubmit,
    onSubmitConfirm,
    onCancelConfirm
  } = useSubmitConfirmation(postMethod, mapData)

  const submitTitle = fields?.fields.submit?.props?.label

  const onSubmitConfirmWrap = async () => {
    const result = await onSubmitConfirm()
    if (result === undefined) return
    if (afterSubmit === undefined) return
    await afterSubmit(result?.data)
  }

  return (
    fields === undefined ?
    <Spinner /> :
    <ScaffoldForm onSubmit={ onSubmit } initialValues={ initialValues }>
      <ScaffoldFields { ...fields }/>
      { isSubmitted &&
        <ConfirmScaffoldFields<typeof fields.fields>
          fields={ fields.fields }
          data={ data }
          showFields={ Object.keys(fields.fields) }
          onCancel={ onCancelConfirm }
          onSubmit={ onSubmitConfirmWrap }
          submitTitle={ submitTitle }
          showInModal={ true }
          submittingTitle={ submittingTitle }
        />
      }
    </ScaffoldForm>
  )
}

export default ConfirmScaffoldForm