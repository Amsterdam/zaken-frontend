import { type FieldErrors } from "react-hook-form"

type AlertError = { id: string; label: string }

/** An error of one field (not the errors of the fields below a name). */
const isFieldError = (error: object): error is { message?: unknown } =>
  "type" in error && typeof (error as { type: unknown }).type === "string"

/**
 * What is wrong in a react-hook-form form, per field, with a link to that
 * field: the `errors` of the Amsterdam Design System's InvalidFormAlert.
 * Also for the fields of a list or a group ("persons.0.first_name").
 *
 * Use this one instead of mapErrorsToAlert of @amsterdam/ee-ads-rhf. That one
 * takes the first element in the whole page with the name of the field, and
 * for a field called "description" that is the <meta name="description"> of
 * index.html, which has no id: the link becomes "#". This one only looks at
 * the fields of a form.
 */
export const mapErrorsToAlert = (
  errors: FieldErrors,
  path = "",
): AlertError[] =>
  Object.entries(errors).flatMap(([key, error]) => {
    if (typeof error !== "object" || error === null) return []
    const name = path ? `${path}.${key}` : key
    if (!isFieldError(error)) {
      return mapErrorsToAlert(error as FieldErrors, name)
    }
    const field =
      document.querySelector(`form [name="${CSS.escape(name)}"]`) ??
      // A field without a name, like the input of a searchable select list:
      // its id is the name.
      document.querySelector(`form [id="${CSS.escape(name)}"]`)
    return [{ id: `#${field?.id ?? ""}`, label: String(error.message ?? "") }]
  })
