import to from "app/routing/utils/to"
import { CaseIdDisplay, DateDisplay } from "@amsterdam/wonen-ui"
import TableAction from "app/components/shared/TableAction/TableAction"

export default (cases?: Components.Schemas.Case[]) =>
  cases?.map(({ id, theme, start_date, current_states }) => (
    [
      <CaseIdDisplay id={ id } />,
      theme.name,
      <DateDisplay date={ start_date ?? undefined } emptyText="-" />,
      current_states.length > 0 ? current_states.map(({ status_name }) => status_name).join(", ") : "-",
      <TableAction to={ to("/zaken/:id", { id }) }>Zaakdetails</TableAction>,
      id
    ]
  ))