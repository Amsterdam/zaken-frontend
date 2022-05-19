import styled from "styled-components"
import { themeSpacing } from "@amsterdam/asc-ui"
import DownloadDocument from "./DownloadDocument"

type Props = {
  record: any
}

const StyledSpan = styled.span`
  display: flex;
`

const StyledMarginRight = styled.span`
  margin-right: ${ themeSpacing(4) };
`

const DEFAULT_SIZE = 20

const TableActions: React.FC<Props> = ({ record }) => (
  <StyledSpan>
    <StyledMarginRight>
      <DownloadDocument size={ DEFAULT_SIZE } />
    </StyledMarginRight>
    <DownloadDocument size={ DEFAULT_SIZE } />
  </StyledSpan>
)

export default TableActions
