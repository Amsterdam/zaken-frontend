import { FC } from "react"

import ConfirmScaffoldForm from "app/components/shared/ConfirmScaffoldForm/ConfirmScaffoldForm"
import scaffold from "./scaffold"
import styled from "styled-components"

type Props = {
  id: Components.Schemas.Case["id"]
}

// Scaffolded label is needed for ConfirmFields
const Div = styled.div`
  label {
    display: none;
  }
  button {
    margin-top: 0;
  }
`

type Values = { task: { label: string, value: number } }
const postMethod = async (values: Values) => {
  console.log("AddTaskFormPost", values)
  return values
}

const AddTaskForm: FC<Props> = ({ id }) => {
  const fields = scaffold()
  const initialValues = { case: id }

  return (
    <Div>
      <ConfirmScaffoldForm
        postMethod={ postMethod }
        fields={ fields }
        initialValues={ initialValues }
      />
    </Div>
  )
}

export default AddTaskForm
