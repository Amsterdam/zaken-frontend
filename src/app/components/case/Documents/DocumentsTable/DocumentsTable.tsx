import { useEffect, useMemo, useState } from "react"
import { Table } from "@amsterdam/wonen-ui"
import getColumns from "./columns"

type Props = {
  documents?: Components.Schemas.PaginatedDocumentTypeList["results"]
  loading: boolean
  getDocuments: () => Promise<unknown>
  documentTypes?: Components.Schemas.DocumentType[]
}

const DocumentsTable: React.FC<Props> = ({ documents, loading, getDocuments, documentTypes }) => {
  const [numLoadingRows, setNumLoadingRows] = useState(3)

  useEffect(() => {
    if (documents && documents?.length > 0) {
      // Set number of loading rows to keep the table height when loading
      setNumLoadingRows(documents.length)
    }
  }, [documents])

  const columns = getColumns(getDocuments, documentTypes)

  // By sorting documents for id, records are sorted for creation date.
  const sortedDocuments = useMemo(() => documents?.sort((a: any, b: any) => b?.id - a?.id), [documents])

  return (
    <Table
      columns={ columns }
      data={ sortedDocuments }
      loading={ loading }
      numLoadingRows={ numLoadingRows }
      emptyPlaceholder="Er zijn geen documenten gevonden"
      pagination={ false }
    />
  )
}

export default DocumentsTable
