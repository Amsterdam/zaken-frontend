import { produce } from "immer"
import { FormPositioner } from "amsterdam-scaffold-form/package"
import POSTCases from "__generated__/POST_Cases.json"

import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"

const fields = produce(POSTCases.fields, (draft) => {
  draft.zaaktype.type = "CaseTypeField"
})

export default new FormPositioner(fields as Fields)
  .setVertical("mobileS")
  .setGrid("laptop", "1fr 1fr", [
    ["startdatum",                    "einddatum"],
    ["url",                           "zaaktype"],
    ["identificatie",                 "omschrijving"],
    ["status",                        "omschrijving"],
    ["uuid",                          "omschrijving"],
    ["bronorganisatie",               "omschrijving"],
    ["verantwoordelijkeOrganisatie",  "omschrijving"],
    ["submit",                        "submit"]
  ])
  .getScaffoldProps()
