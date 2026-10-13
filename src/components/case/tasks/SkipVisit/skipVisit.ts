/** The task of a planned visit: completed by TOP when the visit is made. */
const VISIT_TASK = "task_create_visit"
const SITUATION = "situation"

export const VISIT_SKIPPED = "visit_skipped"
export const SKIP_REASON = "visit_skipped_reason"
export const SKIP_REASON_LABEL = "Reden overslaan huisbezoek"

type Task = Pick<Tasks.WorkflowTask, "task_name" | "form">

/**
 * Whether the visit of this task can be skipped: only the workflows that have
 * a route for it offer "visit_skipped" as a situation, and only for the themes
 * the backend allows it for. So not a visit that was started in an older
 * workflow.
 */
export const canSkipVisit = ({ task_name, form }: Task): boolean =>
  task_name === VISIT_TASK &&
  (form ?? []).some(
    ({ name, options }) =>
      name === SITUATION &&
      (options ?? []).some(({ value }) => value === VISIT_SKIPPED),
  )

/** What the backend calls the reason; its own label, when it gives one. */
export const getSkipReasonLabel = (form: Task["form"]): string =>
  (form ?? []).find(({ name }) => name === SKIP_REASON)?.label ||
  SKIP_REASON_LABEL
