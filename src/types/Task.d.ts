declare namespace Tasks {
  type TaskId = string | number

  type BaseTask = {
    id: TaskId
    owner: string | null
    due_date: string
    name?: string
  }

  /** Taak zoals gebruikt in TableTasks */
  type Task = BaseTask & {
    case: components["schemas"]["Case"]
  }

  type FormField = {
    label: string
    name: string
    /** Without a type the field is only a text to read. */
    type?: "select" | "checkbox" | "multiselect" | "number" | "text"
    /** Left out by the backend for a field that may stay empty. */
    required?: boolean
    tooltip?: string | null
    options?: { label: string; value: string | number }[]
  }

  /** Taak zoals gebruikt in Workflow */
  type WorkflowTask = BaseTask & {
    case_user_task_id: TaskId
    case: number // caseId
    task_name: string
    user_has_permission: boolean
    form: FormField[]
    roles?: string[]
    form_variables?: Record<string, { value: any } | any>
  }

  type CaseWorkflow = {
    state: {
      name: string
    }
    tasks: WorkflowTask[]
    information: string
  }

  /** Generieke pagineringslijst — werkt voor elke T */
  type PaginatedList<T> = {
    /** @example 123 */
    count: number
    /** @example http://api.example.org/accounts/?page=4 */
    next?: string | null
    /** @example http://api.example.org/accounts/?page=2 */
    previous?: string | null
    results: T[]
  }

  /** Specifiek voor workflows */
  type PaginatedWorkflowList = PaginatedList<CaseWorkflow>
}
