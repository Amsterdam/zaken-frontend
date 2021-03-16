import React from "react"
import produce from "immer"

import ScaffoldField, { Field } from "../ScaffoldField"
import { useFormState } from "react-final-form"
import { FormState } from "final-form"
import { Dimensions, Responsive } from "@amsterdam/amsterdam-react-final-form"

export type ShowHideProps = {
  position?: Responsive<Dimensions>
  shouldShow: (formValues: FormState<any>) => boolean
  field: Field
  label?: string
  name?: string
}

const ShowHide: React.FC<ShowHideProps> = ({ shouldShow, field, position }) => {
  const formState = useFormState()

  const positionedField = produce(field, draft => {
    draft.props.position = position
  })

  return shouldShow(formState)
    ? <ScaffoldField field={positionedField} />
    : null
}

export default ShowHide