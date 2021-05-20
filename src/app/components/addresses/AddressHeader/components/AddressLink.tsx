import styled from "styled-components"
import { Link, Typography } from "@amsterdam/asc-ui"
import to from "app/routing/utils/to"

type Props = {
  bagId: string
  headingSize?: "h1" | "h2" | "span"
  isHeader?: boolean
  title?: string
}

const TypographyWrap = styled.div`
  span {
    margin-bottom: 0;
  }
`

const AddressLink: React.FC<Props> = ({ title, bagId, headingSize = "h2", isHeader = false }) => 
  <TypographyWrap>
    <Link href={ to("/adres/:bagId", { bagId }) }>
      <Typography as={ isHeader ? headingSize : "span" } styleAs={ headingSize }>{ title }</Typography>
    </Link>
  </TypographyWrap>
 
export default AddressLink
