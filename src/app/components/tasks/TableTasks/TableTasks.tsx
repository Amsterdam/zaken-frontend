import { Table } from "@amsterdam/wonen-ui";
import getColumns from "./columns";
import useMediaQuery from "app/hooks/useMediaQuery/useMediaQuery";
import createResponsiveColumns from "./createPrioritizedColumns";

type Props = {
  data?: components["schemas"]["CaseUserTask"][]
  isBusy: boolean
  onChange: (pagination: any, sorting: any) => void
  pagination: TABLE.Schemas.Pagination | false
  sorting: TABLE.Schemas.Sorting
  emptyPlaceholder: string
}

const TableTasks: React.FC<Props> = ({
  data, isBusy, onChange, pagination, sorting, emptyPlaceholder,
}) => {
  const columns = getColumns(sorting);
  const { windowWidth } = useMediaQuery();

  const prioritizedColumns = createResponsiveColumns(columns, windowWidth);

  return (
    <Table
      lastColumnFixed
      columns={ prioritizedColumns }
      data={ data }
      loading={ isBusy }
      numLoadingRows={ 10 }
      onChange={ onChange }
      pagination={pagination}
      emptyPlaceholder={ emptyPlaceholder }
    />
  );
};

export default TableTasks;
