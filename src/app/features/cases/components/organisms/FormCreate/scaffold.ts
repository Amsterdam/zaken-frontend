import { produce } from "immer"
import { FormPositioner } from "amsterdam-scaffold-form/package"
import POSTCases from "__generated__/POST_Cases.json"

import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"

const fields = produce(POSTCases.fields, ({ startdatum, einddatum, zaaktype, omschrijving, submit }) => ({
    startdatum,
    einddatum,
    zaaktype: { ...zaaktype, type: "CaseTypeField" },
    omschrijving,
    submit
}))

export default new FormPositioner(fields as Fields)
  .setVertical("mobileS")
  .setGrid("laptop", "1fr 1fr 1fr", [
    ["startdatum",    "einddatum",    "zaaktype"],
    ["omschrijving",  "omschrijving", "omschrijving"],
    ["submit",        "submit",       "submit"]
  ])
  .getScaffoldProps()
