
import { useEffect } from "react"
import produce from "immer"
import { useFormState, useForm } from "react-final-form"
import { type FormState } from "final-form"
import { type Dimensions, type Responsive } from "@amsterdam/amsterdam-react-final-form"
import ScaffoldField, { type Field } from "../ScaffoldField"

export type ShowHideProps = {
  position?: Responsive<Dimensions>
  shouldShow: (formValues: FormState<any>) => boolean
  field: Field
  label?: string
  name?: string
}

const ShowHide: React.FC<ShowHideProps> = ({ shouldShow, field, position }) => {
  const formState = useFormState()
  const form = useForm()

  const isShown = shouldShow(formState)

  // UseEffect to prevent state change when rendering
  useEffect(() => {
    if (!isShown && field.props.name !== undefined) {
      form.change(field.props.name, undefined)
    }
  }, [isShown, form, field.props.name])

  if (isShown) {
    const positionedField = produce(field, draft => {
      draft.props.position = position
    })
    return <ScaffoldField field={ positionedField } />
  } else {
    return null
  }
}

export default ShowHide
