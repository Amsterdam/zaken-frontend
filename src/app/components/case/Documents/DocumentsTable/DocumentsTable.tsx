import { Table } from "@amsterdam/wonen-ui"
import getColumns from "./columns"

type Props = {
  data?: Components.Schemas.DocumentType[]
  loading: boolean
  getDocuments: () => Promise<unknown>
}

const TableTasks: React.FC<Props> = ({ data, loading, getDocuments }) => {
  const columns = getColumns(getDocuments)
  return (
    <Table
      columns={ columns }
      data={ data }
      loading={ loading }
      numLoadingRows={ 3 }
      emptyPlaceholder="Er zijn geen documenten gevonden"
      pagination={ false }
    />
  )
}

export default TableTasks
