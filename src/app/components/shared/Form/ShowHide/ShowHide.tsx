import { FC } from "react"
import produce from "immer"

import ScaffoldField, { Field } from "../ScaffoldField"
import { useFormState, useForm } from "react-final-form"
import { FormState } from "final-form"
import { Dimensions, Responsive } from "@amsterdam/amsterdam-react-final-form"

export type ShowHideProps = {
  position?: Responsive<Dimensions>
  shouldShow: (formValues: FormState<any>) => boolean
  field: Field
  label?: string
  name?: string
}

const ShowHide: FC<ShowHideProps> = ({ shouldShow, field, position }) => {

  const formState = useFormState()
  const form = useForm()

  const positionedField = produce(field, draft => {
    draft.props.position = position
  })

  const isShown = shouldShow(formState)

  if (isShown === false && field.props.name !== undefined) {
    form.change(field.props.name, undefined)
  }

  return isShown
    ? <ScaffoldField field={ positionedField } />
    : null
}

export default ShowHide