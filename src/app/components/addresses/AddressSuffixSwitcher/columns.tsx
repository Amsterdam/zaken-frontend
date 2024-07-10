import TableAction from "app/components/shared/TableAction/TableAction"
import to from "app/routing/utils/to"

const columns = [
  {
    header: "Adres",
    dataIndex: "weergavenaam",
    minWidth: 300
  }, {
    dataIndex: "adresseerbaarobject_id",
    minWidth: 100,
    render: (bagId: any) => (
      <TableAction to={ to("/adres/:bagId", { bagId })}>
        Open
      </TableAction>
    )
  }
]

export default columns
