import { Table } from "@amsterdam/wonen-ui"
import columns from "./columns"

type Props = {
  data?: Components.Schemas.DocumentType[]
  loading: boolean
}

const TableTasks: React.FC<Props> = ({ data, loading }) => (
  <Table
    columns={ columns }
    data={ data }
    loading={ loading }
    numLoadingRows={ 3 }
    emptyPlaceholder="Er zijn geen documenten gevonden"
    pagination={ false }
  />
)

export default TableTasks
