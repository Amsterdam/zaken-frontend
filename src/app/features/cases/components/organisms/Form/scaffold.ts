import { produce } from "immer"
import { FormPositioner } from "amsterdam-scaffold-form/package"

import PUTCases from "__generated__/FormCases.json"

import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"

const fields = produce(PUTCases.fields, ({ start_date, end_date, address_bag_id, submit }) => ({
  start_date,
  end_date,
  // TODO make BAG picker
  address_bag_id: { ...address_bag_id, props: {  ...address_bag_id.props, id: "address" } },
  submit
}))

export default new FormPositioner(fields as Fields)
  .setVertical("mobileS")
  .setGrid("laptop", "1fr 1fr", [
    ["start_date",      "end_date"],
    ["address_bag_id",  "address_bag_id"],
    ["submit",          "submit"]
  ])
  .getScaffoldProps()
