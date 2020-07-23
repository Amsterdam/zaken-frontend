import React, { useMemo } from "react"
import { Button } from "@datapunt/asc-ui"
import { ChevronRight } from "@datapunt/asc-assets/lib"

import to from "app/features/shared/routing/to"
import Table from "app/features/shared/components/molecules/Table/Table"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"

import { useCases } from "app/state/rest"

type ButtonProps = {
  href: string
  text: string
}
const OpenButton: React.FC<ButtonProps> = ({ href, text }) =>
  <ButtonLink to={href}>
    <Button as="span" variant="textButton" iconSize={14} iconLeft={<ChevronRight />}>{ text }</Button>
  </ButtonLink>

const columns = [
  { header:"Startdatum", minWidth: 100 },
  { header:"Adres", minWidth: 300 },
  { minWidth: 210 }
]

const mapData = (data: API.Case) => [
  data.start_date ?? "-",
  data.address.full_address ?? "-",
  <>
    <OpenButton href={to("/cases/:id", { id: data.id })} text="open" />
    <OpenButton href={to("/case-visits/:caseId", { caseId: data.id })} text="bezoeken" />
  </>
]

const TableCases: React.FC = () => {
  const { data, isBusy } = useCases()
  const mappedData = useMemo(() => data?.results?.map(mapData), [ data ])

  return (<Table
    columns={columns}
    data={mappedData}
    loading={data === undefined || isBusy}
    numLoadingRows={10}
    hasFixedColumn={true}
    noValuesPlaceholder={"Er zijn (nog) geen zaken gevonden"}
  />)
}

export default TableCases
