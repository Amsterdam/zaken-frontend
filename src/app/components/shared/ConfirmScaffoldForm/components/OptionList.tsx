import { List, ListItem } from "@amsterdam/asc-ui"

type Props = {
  fields: Array<Record<string, string>>
}

const OptionList: React.FC<Props> = ({ fields }) => {
  console.log("fields..", fields)
  return (
    <List>
      { fields.map(field => {
        const f = field["name"]
        return <ListItem key={ f }>{ f }</ListItem>
        })
      }
    </List>
  )
}
export default OptionList
