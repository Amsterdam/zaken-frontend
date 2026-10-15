/** What is filled in, per field of the form of a task. */
export type TaskFormValues = Record<string, string | boolean | string[]>

/** A number as it may be typed: with a comma or a point. */
export const NUMBER = /^\s*-?\d+([.,]\d+)?\s*$/

type Variables = NonNullable<Tasks.WorkflowTask["form_variables"]>

/** The form starts empty: who completes the task makes every choice. */
export const getDefaultValues = (fields: Tasks.FormField[]): TaskFormValues =>
  Object.fromEntries(
    fields.map(({ name, type }) => {
      if (type === "checkbox") return [name, false]
      if (type === "multiselect") return [name, []]
      return [name, ""]
    }),
  )

/**
 * The filled-in form as the variables the backend completes the task with.
 * What is left empty is left out; a checkbox is always there (true or false).
 */
export const toVariables = (
  fields: Tasks.FormField[],
  values: TaskFormValues,
): Variables =>
  fields.reduce<Variables>((variables, { name, type }) => {
    const value = values[name]
    // Only a text to read: nothing to send.
    if (type === undefined) return variables

    if (type === "checkbox") {
      variables[name] = { value: value === true }
    } else if (type === "number") {
      const number = parseFloat(String(value).replace(",", "."))
      if (!Number.isNaN(number)) variables[name] = { value: number }
    } else if (Array.isArray(value) || value !== "") {
      variables[name] = { value }
    }
    return variables
  }, {})
