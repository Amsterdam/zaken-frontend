import styled from "styled-components"
import { themeSpacing } from "@amsterdam/asc-ui"
import DownloadDocument from "./DownloadDocument"
import DeleteDocument from "./DeleteDocument"

type Props = {
  record: any
  getDocuments: () => Promise<unknown>
}

const StyledSpan = styled.span`
  display: flex;
`

const StyledMarginRight = styled.span`
  margin-right: ${ themeSpacing(4) };
`

const DEFAULT_SIZE = 20

const TableActions: React.FC<Props> = ({ record, getDocuments }) => (
  <StyledSpan>
    <StyledMarginRight>
      <DownloadDocument size={ DEFAULT_SIZE } documentId={ record.id } />
    </StyledMarginRight>
    <DeleteDocument size={ DEFAULT_SIZE } documentId={ record.id } getDocuments={ getDocuments } />
  </StyledSpan>
)

export default TableActions
