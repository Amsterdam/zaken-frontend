import styled from "styled-components"
import { themeSpacing } from "@amsterdam/asc-ui"
import { capitalizeString } from "app/components/shared/Helpers/helpers"

type Props = {
  items: string[]
}

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    padding: 0 0 ${ themeSpacing(1) } 0;
    line-height: 1.15;
  }
`

const List: React.FC<Props> = ({ items }) => (
  <Ul>
    { items.map((item: string, index: number) =>
        <li key={ `${ item }_${ index }` }>{ capitalizeString(item) }</li>
    )}
  </Ul>
)

export default List