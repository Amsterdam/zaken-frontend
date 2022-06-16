import { useEffect, useMemo, useState } from "react"
import { Table } from "@amsterdam/wonen-ui"
import { useDocumentTypesByCase } from "app/state/rest"
import getColumns from "./columns"

type Props = {
  caseId: Components.Schemas.CaseEvent["id"]
  data?: Components.Schemas.DocumentType[]
  loading: boolean
  getDocuments: () => Promise<unknown>
}

const DocumentsTable: React.FC<Props> = ({ caseId, data, loading, getDocuments }) => {
  const [numLoadingRows, setNumLoadingRows] = useState(3)
  const [documentTypes] = useDocumentTypesByCase(caseId)

  useEffect(() => {
    if (data && data?.length > 0) {
      // Set number of loading rows to keep the table height when loading
      setNumLoadingRows(data.length)
    }
  }, [data])

  const columns = getColumns(getDocuments, documentTypes)

  // By sorting data for id, records are sorted for creation date.
  const sortedData = useMemo(() => data?.sort((a: any, b: any) => b?.id - a?.id), [data])

  return (
    <Table
      columns={ columns }
      data={ sortedData }
      loading={ loading }
      numLoadingRows={ numLoadingRows }
      emptyPlaceholder="Er zijn geen documenten gevonden"
      pagination={ false }
    />
  )
}

export default DocumentsTable
