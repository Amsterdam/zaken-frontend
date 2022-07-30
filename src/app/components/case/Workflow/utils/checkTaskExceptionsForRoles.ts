const TASK_EXCEPTIONS: string[] = [
  "task_add_extra_information" // "Verwerken extra informatie"
]

// There are some tasks that can be done by everyone.
const checkTaskExceptionsForRoles = (task: Components.Schemas.CaseUserTaskWorkdflow) => {
  if (TASK_EXCEPTIONS.includes(task?.task_name)) {
    return ["Alle rollen"]
  }
  return task?.roles
}

export default checkTaskExceptionsForRoles
