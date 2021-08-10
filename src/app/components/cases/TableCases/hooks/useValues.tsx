import first from "../utils/first"
import sortByDate from "../utils/sortByDate"
import { DateDisplay, isDate } from "@amsterdam/wonen-ui"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"
import to from "app/routing/utils/to"
import navigateTo from "app/routing/navigateTo"

export default (cases?: Components.Schemas.Case[]) => [
  cases
    ?.sort((a, b) => a.address.full_address.localeCompare(b.address.full_address))
    .map(({ id, address, current_states, end_date }) => {
      const startDate = first(current_states.map(({ start_date }) => start_date).sort(sortByDate("DESC")))

      return [
        address.full_address ?? "-",
        current_states.length > 0 ? current_states.map(({ status_name }) => status_name).join(", ") : isDate(end_date) ? "Afgerond" : "-",
        <DateDisplay date={ end_date ?? startDate } emptyText="-" />,
        <TableAction to={ to("/zaken/:id", { id }) }>Zaakdetails</TableAction>
      ]
    }),
  (event: React.MouseEvent, index: number) => {
    const id = cases?.[index].id
    navigateTo("/zaken/:id", { id })
  }
] as const