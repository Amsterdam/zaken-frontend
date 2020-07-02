import { produce } from "immer"
import { FormPositioner } from "amsterdam-scaffold-form/package"

import PUTCases from "__generated__/FormCases.json"

import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"

const fields = produce(PUTCases.fields, ({ startdatum, einddatum, zaaktype, omschrijving, toelichting, submit, status }) => ({
  startdatum,
  einddatum,
  zaaktype: { ...zaaktype, type: "CaseTypeField" },
  status: { ...status, type: "CaseStatusField" },
  // TODO agreed with backend that we don't want to abuse field like this. Adres should be an adres-field, and projectnaam should be a projectnaam-field.
  toelichting: { ...toelichting, props: { ...toelichting.props, label: "Adres" } },
  omschrijving: { ...omschrijving, props: { ...omschrijving.props, label: "Projectnaam" } },
  submit
}))

export default new FormPositioner(fields as Fields)
  .setVertical("mobileS")
  .setGrid("laptop", "1fr 1fr", [
    ["startdatum",    "einddatum"],
    ["zaaktype",      "status"],
    ["toelichting",   "omschrijving"],
    ["submit",        "submit"]
  ])
  .getScaffoldProps()
