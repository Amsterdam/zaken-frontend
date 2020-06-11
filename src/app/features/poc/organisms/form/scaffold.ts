import { FormPositioner } from "amsterdam-scaffold-form/package"
import { ScaffoldAvailableFields } from "amsterdam-react-final-form"

import POSTCases from "__generated__/POST_Cases.json"

type Fields = Record<string, ScaffoldAvailableFields>

export default new FormPositioner(POSTCases.fields as Fields)
  .setVertical("mobileS")
  .setGrid("laptop", "1fr 1fr", [
    ["startdatum",                    "einddatum"],
    ["url",                           "uuid"],
    ["identificatie",                 "omschrijving"],
    ["status",                        "omschrijving"],
    ["zaaktype",                      "omschrijving"],
    ["bronorganisatie",               "omschrijving"],
    ["verantwoordelijkeOrganisatie",  "omschrijving"],
    ["submit",                        "submit"]
  ])
  .getScaffoldProps()
