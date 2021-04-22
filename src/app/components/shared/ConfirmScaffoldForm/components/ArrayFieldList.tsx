
import { List, ListItem } from "@amsterdam/asc-ui"

const ArrayFieldList: React.FC<{ fields: Array<Record<string, string>> }> = ({ fields }) => (
  <List>
    { fields.map(field => {
        const s = Object.keys(field).map(key => field[key]).join(" ")
        return <ListItem key={ s }>{ s }</ListItem>
    })
    }
  </List>
)
export default ArrayFieldList
