import React, { useState } from "react"

import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import createScaffoldProps from "./scaffold"
import styled from "styled-components"
import { themeSpacing } from "@amsterdam/asc-ui"

type Props = {
  onSubmit: () => void //Promise<unknown>
  isLoading?: boolean
  onCancel: () => void
  dueDate: string
}

const Div = styled.div`
  button[type=submit] {
    float: right;
    clear: both;
  }
`

const Input = styled.input`
  margin: ${ themeSpacing(6) } 0;
  padding: ${ themeSpacing(2) } ${ themeSpacing(3) };
`

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  let day = ("0" + date.getDate()).slice(-2)
  let month = ("0" + (date.getMonth() + 1)).slice(-2)
  let year = date.getFullYear()

  return (year + "-" + month + "-" + day)
}

const ChangeDueDateForm: React.FC<Props> = ({ isLoading, onSubmit, onCancel , dueDate }) => {

  const [newDueDate, setNewDueDate] = useState(dueDate)
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDueDate(event.target.value)
  }

  return (
    <Div>
      <ScaffoldForm
        showSpinner={ isLoading }
        onSubmit={ onSubmit }
        onCancel={ onCancel }
      >
        <Input type="date" value={formatDate(newDueDate)} name="date" id="date" onChange = {onChange} />
        <ScaffoldFields { ...createScaffoldProps(onCancel, dueDate) } />
      </ScaffoldForm>
    </Div>

  )
}
  
export default ChangeDueDateForm
