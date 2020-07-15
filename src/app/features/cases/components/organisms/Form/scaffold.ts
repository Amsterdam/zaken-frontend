import { produce } from "immer"
import { FormPositioner } from "amsterdam-scaffold-form/package"

import PUTCases from "__generated__/FormCases.json"

import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"

const fields = produce(PUTCases.fields, ({ start_date, end_date, case_type_id, address_bag_id, submit }) => ({
  start_date,
  end_date,
  case_type: { type: "CaseTypeField", props: { label: "Zaaktype", name: "case_type" } },
  address_bag_id,
  submit
}))

export default new FormPositioner(fields as Fields)
  .setVertical("mobileS")
  .setGrid("laptop", "1fr 1fr", [
    ["start_date",      "end_date"],
    ["case_type",       "case_type"],
    ["address_bag_id",  "address_bag_id"],
    ["submit",          "submit"]
  ])
  .getScaffoldProps()
