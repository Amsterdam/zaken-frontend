import React from "react"
import { Button } from "@datapunt/asc-ui"
import { ChevronRight } from "@datapunt/asc-assets/lib"

import to from "app/features/shared/routing/to"
import Table from "app/features/shared/components/molecules/Table/Table"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"

import useCaseVisits, { CaseVisit } from "../../../hooks/useCaseVisits"

type ButtonProps = {
  href: string
  text: string
}
const OpenButton: React.FC<ButtonProps> = ({ href, text }) =>
  <ButtonLink to={href}>
    <Button as="span" variant="textButton" iconSize={14} iconLeft={<ChevronRight />}>{ text }</Button>
  </ButtonLink>

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
  data.published ? undefined : <OpenButton href={to("/case-visits/:id/edit", { id: data.case_id })} text="afronden" />
]

const TableCases: React.FC = () => {
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

export default TableCases
