import { themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"

type Props = {
  items: string[]
  emptyValue?: string
}

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    padding: 0 0 ${ themeSpacing(1) } 0;
    line-height: 1.15;
  }
`

const List: React.FC<Props> = ({ items, emptyValue = "-" }) => (
  <>
    { items.length > 0 ?
      <Ul>
        { items.map((item: string, index: number) =>
          <li key={ index }>{ item }</li>
        )}
      </Ul> :
      emptyValue
    }
  </>
)

export default List