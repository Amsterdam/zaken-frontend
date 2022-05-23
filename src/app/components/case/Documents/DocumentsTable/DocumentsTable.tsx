import { Table } from "@amsterdam/wonen-ui"
import { useEffect, useState } from "react"
import getColumns from "./columns"

type Props = {
  data?: Components.Schemas.DocumentType[]
  loading: boolean
  getDocuments: () => Promise<unknown>
}

const TableTasks: React.FC<Props> = ({ data, loading, getDocuments }) => {
  const [numLoadingRows, setNumLoadingRows] = useState(3)

  useEffect(() => {
    if (data && data?.length > 0) {
      // Set number of loading rows to keep the table height when loading
      setNumLoadingRows(data.length)
    }
  }, [data])

  const columns = getColumns(getDocuments)

  return (
    <Table
      columns={ columns }
      data={ data }
      loading={ loading }
      numLoadingRows={ numLoadingRows }
      emptyPlaceholder="Er zijn geen documenten gevonden"
      pagination={ false }
    />
  )
}

export default TableTasks
