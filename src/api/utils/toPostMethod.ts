/**
 * Adapts a TanStack mutateAsync to the postMethod contract of the old forms
 * (ConfirmScaffoldForm, WorkflowForm, ScaffoldForm): `{ data }` when it
 * succeeded, `undefined` when it failed (the error is already shown as a flash
 * message). Remove when the forms move to react-hook-form (MIGRATION.md Fase 3).
 */
export const toPostMethod =
  <Variables, Data>(mutateAsync: (variables: Variables) => Promise<Data>) =>
  (variables: Variables) =>
    mutateAsync(variables)
      .then((data) => ({ data }))
      .catch(() => undefined)
