import { useState } from "react"
import { useForm } from "react-hook-form"
import { Column, Paragraph } from "@amsterdam/design-system-react"
import { ConfirmDialog } from "@/components/ConfirmDialog/ConfirmDialog"
import { FormDialog } from "@/components/FormDialog/FormDialog"
import { useToast } from "@/components/toasts/useToast"
import { TaskFormField } from "./TaskFormField"
import {
  getDefaultValues,
  type TaskFormValues,
  toVariables,
} from "./taskFormValues"

type Props = {
  taskName: string
  /** The fields to fill in to complete the task; none for most tasks. */
  form?: Tasks.WorkflowTask["form"]
  /** Completes the task; rejects when that failed. */
  onSubmit: (
    variables: Tasks.WorkflowTask["form_variables"],
  ) => Promise<unknown>
  onClose: () => void
}

type FormProps = Props & { form: Tasks.FormField[] }

/** Runs the completion: a toast when it worked, the dialog stays when not. */
const useCompleteTask = ({ taskName, onSubmit, onClose }: Props) => {
  const [isPending, setIsPending] = useState(false)
  const { showToast } = useToast()

  const complete = async (variables: Tasks.WorkflowTask["form_variables"]) => {
    setIsPending(true)
    try {
      await onSubmit(variables)
    } catch {
      // The error is shown as a message at the top of the page; the dialog stays.
      setIsPending(false)
      return
    }
    showToast({
      severity: "success",
      title: "Taak afgerond",
      description: (
        <>
          De taak <strong>{taskName}</strong> is afgerond.
        </>
      ),
    })
    onClose()
  }

  return { complete, isPending }
}

/** The task has questions to answer first. */
const CompleteTaskFormDialog: React.FC<FormProps> = (props) => {
  const { taskName, form: fields, onClose } = props
  const { complete, isPending } = useCompleteTask(props)
  const form = useForm<TaskFormValues>({
    mode: "onChange",
    defaultValues: getDefaultValues(fields),
  })

  return (
    <FormDialog
      heading={taskName}
      form={form}
      onSubmit={(values) => complete(toVariables(fields, values))}
      submitText="Taak afronden"
      pendingText="Bezig met afronden…"
      isPending={isPending}
      onClose={onClose}
    >
      <Column>
        {fields.map((field) => (
          <TaskFormField key={field.name} field={field} />
        ))}
      </Column>
    </FormDialog>
  )
}

/** The task has nothing to fill in: only the question whether it is done. */
const ConfirmTaskDialog: React.FC<Props> = (props) => {
  const { taskName, onClose } = props
  const { complete, isPending } = useCompleteTask(props)

  return (
    <ConfirmDialog
      title="Taak afronden"
      confirmText={isPending ? "Bezig met afronden…" : "Taak afronden"}
      isPending={isPending}
      onConfirm={() => void complete({})}
      onCancel={onClose}
    >
      Is de taak <strong>{taskName}</strong> afgerond?
    </ConfirmDialog>
  )
}

/** Completes a task, in a dialog. Render it while it is open. */
const CompleteTaskDialog: React.FC<Props> = (props) =>
  props.form && props.form.length > 0 ? (
    <CompleteTaskFormDialog {...props} form={props.form} />
  ) : (
    <ConfirmTaskDialog {...props} />
  )

export default CompleteTaskDialog
