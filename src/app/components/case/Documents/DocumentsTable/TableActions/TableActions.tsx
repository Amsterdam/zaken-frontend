import styled from "styled-components"
import DownloadDocument from "./DownloadDocument"
import DeleteDocument from "./DeleteDocument"

type Props = {
  record: any
  getDocuments: () => Promise<unknown>
}

const StyledSpan = styled.span`
  display: flex;
  width: 60px;
  justify-content: space-between;
  align-items: center;
`

const DEFAULT_SIZE = 20

const TableActions: React.FC<Props> = ({ record, getDocuments }) => (
  <StyledSpan>
    <DownloadDocument size={ DEFAULT_SIZE } record={ record } />
    <DeleteDocument
      size={ DEFAULT_SIZE }
      record={ record }
      getDocuments={ getDocuments }
    />
  </StyledSpan>
)

export default TableActions
