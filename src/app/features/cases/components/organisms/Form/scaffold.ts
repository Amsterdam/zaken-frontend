import { produce } from "immer"
import { FormPositioner } from "amsterdam-scaffold-form/package"

import PUTCases from "__generated__/FormCases.json"

import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"

const fields = produce(PUTCases.fields, ({ startdatum, einddatum, zaaktype, omschrijving, submit, status }) => ({
  startdatum,
  einddatum,
  zaaktype: { ...zaaktype, type: "CaseTypeField" },
  status: { ...status, type: "CaseStatusField" },
  omschrijving,
  submit
}))

export default new FormPositioner(fields as Fields)
  .setVertical("mobileS")
  .setGrid("laptop", "1fr 1fr", [
    ["startdatum",    "einddatum"],
    ["zaaktype",      "status"],
    ["omschrijving",  "omschrijving"],
    ["submit",        "submit"]
  ])
  .getScaffoldProps()
