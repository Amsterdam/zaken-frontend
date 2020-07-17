import { FormPositioner } from "amsterdam-scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import type { CaseVisit } from "../../../hooks/useCaseVisits"

const caseVisitChecks = [
  { field: "a", label: "Niemand aanwezig" },
  { field: "b", label: "Bel stuk" },
  { field: "c", label: "Overtreding" },
  { field: "d", label: ".........." }
]

const createScaffold = (values?: CaseVisit, onClickNoteButton?: any) => {
  const fields: Fields = {
    visitStatuses: {
      type: "ComplexCheckboxFields",
      props: {
        label: "Kies eventueel een kenmerk:",
        name: "visitStatuses",
        options: caseVisitChecks,
        optionLabelField: "label"
      }
    },
    note: {
      type: "TextAreaField",
      props: {
        name: "note",
        label: "notitie"
      }
    },
    note0: {
      type: "TextAreaField",
      props: {
        name: "note0",
        label: "notitie TZH 1",
        disabled: true
      }
    },
    note0Button: {
      type: "Button",
      props: {
        label: "Voeg toe",
        align: "right",
        onClick: onClickNoteButton("note0")
      }
    },
    note1: {
      type: "TextAreaField",
      props: {
        name: "note1",
        label: "notitie TZH 2",
        disabled: true
      }
    },
    note1Button: {
      type: "Button",
      props: {
        label: "Voeg toe",
        align: "right",
        onClick: onClickNoteButton("note1")
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Publiceren",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields)
    .setVertical("mobileS")
    .setGrid("laptop", "1fr 1fr", [
      ["note",      "note0"],
      ["note",      "note0Button"],
      ["note",       "note1"],
      ["note",      "note1Button"],
      ["visitStatuses",  "visitStatuses"],
      ["submit",          "submit"]
    ])
    .getScaffoldProps()
}
export default createScaffold
