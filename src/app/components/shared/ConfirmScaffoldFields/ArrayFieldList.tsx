import React from "react"
import { OrderedList, ListItem } from "@amsterdam/asc-ui"

const ArrayFieldList: React.FC<{ fields: Array<Record<string, string>> }> = ({ fields }) => (
  <OrderedList>
    { fields.map(field => {
        const s = Object.keys(field).map(key => field[key]).join(" ")
        return <ListItem key={ s }>{ s }</ListItem>
    })
    }
  </OrderedList>
)
export default ArrayFieldList
