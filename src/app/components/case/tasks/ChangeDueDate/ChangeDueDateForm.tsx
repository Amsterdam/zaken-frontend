import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import createScaffoldProps from "./scaffold"

type Props = {
  onSubmit: (data: any) => void
  isLoading?: boolean
  onCancel: () => void
  dueDate: string
  minDate?: Date
  taskId: string
}

const formatDate = (dateStr: string | Date) => {
  const date = new Date(dateStr)
  const day = `0${ date.getDate() }`.slice(-2)
  const month = `0${ date.getMonth() + 1 }`.slice(-2)
  const year = date.getFullYear()

  return `${ year }-${ month }-${ day }`
}

const ChangeDueDateForm: React.FC<Props> = ({ isLoading, onSubmit, onCancel , dueDate, minDate = new Date(), taskId }) =>
  <div>
    <ScaffoldForm
      showSpinner={ isLoading }
      onSubmit={ onSubmit }
      onCancel={ onCancel }
      initialValues={ { date: formatDate(dueDate), camunda_task_id: taskId } }
    >
      <ScaffoldFields { ...createScaffoldProps(onCancel, formatDate(minDate) ) } />
    </ScaffoldForm>
  </div>

export default ChangeDueDateForm
