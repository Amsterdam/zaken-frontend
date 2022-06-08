import moment from "moment"
import styled from "styled-components"
import formatBytes from "../utils/formatBytes"
import TableActions from "./TableActions/TableActions"

type Props = {
  columnWidth?: string
}

const StyledName = styled.span<Props>`
  width: ${ props => props.columnWidth || "300px" };
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: inline-block;
`

const getDocumentTypeName = (type: string, documentTypes?: Components.Schemas.DocumentType[]) => {
  if (!documentTypes) {
    return null
  }
  const found = documentTypes.find((doc) => doc.url === type)
  if (found) {
    return found.omschrijving
  }
  return null
}

const getColumns = (getDocuments: () => Promise<unknown>, documentTypes?: Components.Schemas.DocumentType[]) => [
  {
    header: "Naam",
    dataIndex: "bestandsnaam",
    minWidth: 100,
    render: (text: any, record: any) => record.error ? "Document niet gevonden" : <StyledName>{ text ?? "-" }</StyledName>
  }, {
    header: "Type",
    dataIndex: "informatieobjecttype",
    minWidth: 100,
    render: (type: any) => <StyledName columnWidth="200px">{ getDocumentTypeName(type, documentTypes) ?? "-" }</StyledName>
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
