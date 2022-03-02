import { List, ListItem } from "@amsterdam/asc-ui"

type ComplexField = { label: string }

type Props = {
  fields: Array<Record<string, string | ComplexField>>
}

const isComplexField = (field: string | ComplexField): field is ComplexField => typeof field !== "string"

const ArrayFieldList: React.FC<Props> = ({ fields }) => (
  <List>
    { fields.map(field => {
        const s = Object.keys(field).map(key => {
          const f = field[key]
          return isComplexField(f) ? `- ${ f?.label }` : f
        }).join(" ")
        return <ListItem key={ s }>{ s }</ListItem>
      })
    }
  </List>
)
export default ArrayFieldList
