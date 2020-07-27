import { FormPositioner } from "amsterdam-scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"

const caseVisitChecks = [
  { field: "a", label: "Niemand aanwezig" },
  { field: "b", label: "Bel stuk" },
  { field: "c", label: "Overtreding" },
  { field: "d", label: ".........." }
]

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
      hint: "Sed posuere consectetur est at lobortis. Vestibulum id ligula porta felis euismod semper.",
      label: "Notitie"
    }
  },
  note0: {
    type: "TextAreaField",
    props: {
      name: "note0",
      label: "Notitie toezichthouder 1",
      disabled: true
    }
  },
  note0Button: {
    type: "AutoFillButton",
    props: {
      label: "Voeg toe",
      align: "right",
      field: "note0",
      target: "note"
    }
  },
  note1: {
    type: "TextAreaField",
    props: {
      name: "note1",
      label: "Notitie toezichthouder 1",
      disabled: true
    }
  },
  note1Button: {
    type: "AutoFillButton",
    props: {
      label: "Voeg toe",
      align: "right",
      field: "note1",
      target: "note"
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

export default new FormPositioner(fields)
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
