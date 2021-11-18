import TableAction from "app/components/shared/TableAction/TableAction"
import to from "app/routing/utils/to"

const columns = [
  {
    header: "Adres",
    dataIndex: "adres",
    minWidth: 300
  }, {
    dataIndex: "adresseerbaar_object_id",
    minWidth: 100,
    render: (bagId: any) => (
      <TableAction to={ to("/adres/:bagId", { bagId })}>
        Open
      </TableAction>
    )
  }
]

export default columns
