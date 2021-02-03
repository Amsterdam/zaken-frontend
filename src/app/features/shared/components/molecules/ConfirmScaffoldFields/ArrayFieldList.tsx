import React from "react"
import { OrderedList, ListItem } from "@amsterdam/asc-ui"

const ArrayFieldList: React.FC<{ fields: Array<Record<string, string>> }> = ({ fields }) => (
  <OrderedList>
    { fields.map(field =>
        <ListItem>{ Object.keys(field).map(key => field[key]).join(" ") }</ListItem>
      )
    }
  </OrderedList>
)
export default ArrayFieldList
