import moment from "moment"
import styled from "styled-components"
import formatBytes from "../utils/formatBytes"
import TableActions from "./TableActions/TableActions"

const StyledName = styled.span`
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: inline-block;
`

const getColumns = (getDocuments: () => Promise<unknown>) => [
  {
    header: "Naam",
    dataIndex: "bestandsnaam",
    minWidth: 100,
    render: (text: any, record: any) => record.error ? "Document niet gevonden" : <StyledName>{ text ?? "-" }</StyledName>
  }, {
    header: "Aangemaakt",
    dataIndex: "creatiedatum",
    minWidth: 100,
    render: (text: any) => text ? moment(text).format("DD-MM-YYYY") : "-"
  }, {
    header: "Extensie",
    dataIndex: "formaat",
    render: (text: any) => text ?? "-"
  }, {
    header: "Bestandsgrootte",
    dataIndex: "bestandsomvang",
    minWidth: 100,
    render: (size: any) => formatBytes(size)
  }, {
    header: "Acties",
    dataIndex: "",
    minWidth: 100,
    render: (text: any, record: any) => <TableActions record={ record } getDocuments={ getDocuments } />
  }
]

export default getColumns
