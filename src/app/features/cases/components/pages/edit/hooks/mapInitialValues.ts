import produce from "immer"

export const mapInitialValues = produce((draft?) => {
  if (draft !== undefined) {
    draft.status = draft?.status?.url
  }
})
