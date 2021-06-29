import first from "../utils/first"
import sortByDate from "../utils/sortByDate"
import { DateDisplay } from "@amsterdam/wonen-ui"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"
import to from "app/routing/utils/to"
import navigateTo from "app/routing/navigateTo"

const onClick = (id: Components.Schemas.Case["id"]) => (event: React.MouseEvent) => {
  navigateTo("/zaken/:id", { id })
}

export default (cases?: Components.Schemas.Case[]) =>
  cases?.map(({ id, address, current_states, end_date }) => {
    const startDate = first(current_states.map(({ start_date }) => start_date).sort(sortByDate("DESC")))
    
    return {
      onClick: onClick(id),
      itemList: [
        address.full_address ?? "-",
        current_states.length > 0 ? current_states.map(({ status_name }) => status_name).join(", ") : typeof end_date === "string" ? "Afgerond" : "-",
        typeof end_date === "string" ? <DateDisplay date={ end_date } /> : startDate !== undefined ? <DateDisplay date={ startDate } />  : "-",
        <TableAction to={ to("/zaken/:id", { id }) }>Zaakdetails</TableAction>
      ]
    }
  })