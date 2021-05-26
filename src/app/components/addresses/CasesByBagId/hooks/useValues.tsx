import to from "app/routing/utils/to"
import { CaseIdDisplay, DateDisplay } from "@amsterdam/wonen-ui"
import OpenButton from "app/components/shared/OpenButton/OpenButton"
import navigateTo from "app/routing/navigateTo"
import React from "react"

const onClick = (id: Components.Schemas.Case["id"]) => (event: React.MouseEvent) => {
  navigateTo("/zaken/:id", { id })
}

export default (cases?: Components.Schemas.Case[]) =>
  cases?.map(({ id, team, start_date, current_states }) => ({
    onClick: onClick(id),
    itemList: [
      <CaseIdDisplay id={ id } />,
      team.name,
      start_date ? <DateDisplay date={ start_date } /> : "-",
      current_states.length > 0 ? current_states.map(({ status_name }) => status_name).join(", ") : "-",
      <OpenButton href={ to("/zaken/:id", { id }) } text="Zaakdetails" />
    ]
  }))