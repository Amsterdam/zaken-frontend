import React from "react"

import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import createScaffoldProps from "./scaffold"
import styled from "styled-components"
// import { themeSpacing } from "@amsterdam/asc-ui"

type Props = {
  onSubmit: (data: any) => void
  isLoading?: boolean
  onCancel: () => void
  dueDate: string
  minDate?: Date
}

const Div = styled.div`
  button[type=submit] {
    float: right;
    clear: both;
  }
`

const formatDate = (dateStr: string | Date) => {
  const date = new Date(dateStr)
  const day = ("0" + date.getDate()).slice(-2)
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const year = date.getFullYear()

  return `${ year }-${ month }-${ day }`
}

const ChangeDueDateForm: React.FC<Props> = ({ isLoading, onSubmit, onCancel , dueDate, minDate = new Date() }) => 
  
    <Div>
      <ScaffoldForm
        showSpinner={ isLoading }
        onSubmit={ onSubmit }
        onCancel={ onCancel }
        initialValues={ { due_date: formatDate(dueDate) } }
      >
        <ScaffoldFields { ...createScaffoldProps(onCancel, formatDate(minDate) ) } />
      </ScaffoldForm>
    </Div>
  
export default ChangeDueDateForm
