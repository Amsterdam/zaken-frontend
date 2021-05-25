import first from "../utils/first"
import sortByDate from "../utils/sortByDate"
import { DateDisplay } from "@amsterdam/wonen-ui"
import OpenButton from "app/components/shared/OpenButton/OpenButton"
import to from "app/routing/utils/to"
import navigateTo from "app/routing/navigateTo"

const onClick = (id: Components.Schemas.Case["id"]) => (e: React.MouseEvent) => {
  navigateTo("/zaken/:id", { id })
}

export default (cases?: Components.Schemas.Case[]) =>
  cases?.map(({ id, address, current_states }) => {

    const startDate = first(current_states.map(({ start_date }) => start_date).sort(sortByDate("DESC")))

    return {
      onClick: onClick(id),
      itemList: [
        address.full_address ?? "-",
        current_states.length > 0 ? current_states.map(({ status_name }) => status_name).join(", ") : "-",
        startDate !== undefined ? <DateDisplay date={ startDate } /> : "-",
        <OpenButton href={ to("/zaken/:id", { id }) } text="Zaakdetails" />
      ]
    }
  })