import styled from "styled-components"
import DownloadDocument from "./DownloadDocument"
import DeleteDocument from "./DeleteDocument"
import ViewDocument from "./ViewDocument"

type Props = {
  record: any
  getDocuments: () => Promise<unknown>
}

const StyledSpan = styled.span`
  display: flex;
  width: 90px;
  justify-content: space-between;
  align-items: center;
`

const DEFAULT_SIZE = 20

const TableActions: React.FC<Props> = ({ record, getDocuments }) => (
  <StyledSpan>
    <ViewDocument size={ DEFAULT_SIZE } record={ record } />
    <DownloadDocument size={ DEFAULT_SIZE } record={ record } />
    <DeleteDocument
      size={ DEFAULT_SIZE }
      record={ record }
      getDocuments={ getDocuments }
    />
  </StyledSpan>
)

export default TableActions
