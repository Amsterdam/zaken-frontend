import { type FieldErrors } from "react-hook-form"

/**
 * What is wrong in a react-hook-form form, per field, with a link to that
 * field: the `errors` of the Amsterdam Design System's InvalidFormAlert.
 *
 * Use this one instead of mapErrorsToAlert of @amsterdam/ee-ads-rhf. That one
 * takes the first element in the whole page with the name of the field, and
 * for a field called "description" that is the <meta name="description"> of
 * index.html, which has no id: the link becomes "#". This one only looks at
 * the fields of a form.
 */
export const mapErrorsToAlert = (errors: FieldErrors) =>
  Object.entries(errors).map(([name, error]) => ({
    id: `#${document.querySelector(`form [name="${CSS.escape(name)}"]`)?.id ?? ""}`,
    label: String(error?.message ?? ""),
  }))
