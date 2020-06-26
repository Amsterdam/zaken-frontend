import { FormPositioner } from "amsterdam-scaffold-form/package"
import POSTCases from "__generated__/POST_Cases.json"

import { Fields } from "app/features/shared/types"

export default new FormPositioner(POSTCases.fields as Fields)
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
