import { produce } from "immer"
import { FormPositioner } from "amsterdam-scaffold-form/package"
import PUTCases from "__generated__/PUT_Cases.json"

import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"

const fields = produce(PUTCases.fields, (draft) => {
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
