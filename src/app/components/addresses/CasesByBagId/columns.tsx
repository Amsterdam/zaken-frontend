import to from "app/routing/utils/to"
import { CaseIdDisplay, DateDisplay } from "@amsterdam/wonen-ui"
import TableAction from "app/components/shared/TableAction/TableAction"

const columns = [
  {
    header: "Zaak ID",
    dataIndex: "id" ,
    minWidth: 100,
    render: (id: any) => <CaseIdDisplay id={ id } />
  }, {
    header: "Thema",
    dataIndex: "theme.name" ,
    minWidth: 100
  }, {
    header: "Startdatum",
    dataIndex: "start_date" ,
    minWidth: 100,
    render: (start_date: any) => <DateDisplay date={ start_date ?? undefined } emptyText="-" />
  }, {
    header: "Huidige status",
    dataIndex: "current_states" ,
    minWidth: 100,
    render: (current_states: any) => current_states?.length > 0 ? current_states.map((status: any) => status.status_name).join(", ") : "-"
  }, {
    dataIndex: "id",
    minWidth: 140,
    render: (id: any) => <TableAction to={ to("/zaken/:id", { id }) }>Zaakdetails</TableAction>
  }
]

export default columns
