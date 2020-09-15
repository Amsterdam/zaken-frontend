import React from "react"

import to from "app/features/shared/routing/to"
import Table from "app/features/shared/components/molecules/Table/Table"
import OpenButton from "app/features/shared/components/atoms/OpenButton/OpenButton"

import useCaseVisits, { CaseVisit } from "../../../hooks/useCaseVisits"

const columns = [
  { header: "Datum", minWidth: 300 },
  { header: "Team", minWidth: 300 },
  { header: "Gepubliceerd", minWidth: 90 },
  { minWidth: 120 }
]

const mapData = (data: CaseVisit) => [
  data.date.toString().substring(0, 15),
  data.employees.join(", "),
  data.published ? "Ja" : "Nee",
  data.published ? undefined : <OpenButton href={to("/case-visits/:id/edit", { id: data.case_id })} text="Afronden" />
]

const TableCaseVisits: React.FC = () => {
  const data = useCaseVisits()
  const mappedData = data?.map(mapData)

  return (
    <Table
      columns={columns}
      data={mappedData}
      loading={false}
      hasFixedColumn={true}
      noValuesPlaceholder={"Er zijn (nog) geen zaakbezoeken gevonden"}
    />
  )
}

export default TableCaseVisits
