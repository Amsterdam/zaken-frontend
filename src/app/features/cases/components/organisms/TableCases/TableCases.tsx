import React, { useMemo } from "react"
import { Button } from "@datapunt/asc-ui"
import { ChevronRight } from "@datapunt/asc-assets/lib"

import to from "app/features/shared/routing/to"
import Table from "app/features/shared/components/molecules/Table/Table"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"

import { useCases } from "app/state/rest"

type ButtonProps = {
  href: string
}
const OpenButton: React.FC<ButtonProps> = ({ href }) =>
  <ButtonLink to={href}>
    <Button as="span" variant="textButton" iconSize={14} iconLeft={<ChevronRight />}>Open</Button>
  </ButtonLink>

const columns = [
  { header:"Startdatum", minWidth: 100 },
  { header:"Adres", minWidth: 300 },
  { minWidth: 90 }
]

const mapData = (data: API.Case) => [
  data.start_date ?? "-",
  data.address.full_address ?? "-",
  <OpenButton href={to("/cases/:id", { id: data.identification })} />
]

const TableCases: React.FC = () => {
  const { data, isBusy } = useCases()
  const mappedData = useMemo(() => data?.results?.map(mapData), [ data ])

  return (<Table
    columns={columns}
    data={mappedData}
    loading={data === undefined || isBusy}
    hasFixedColumn={true}
    noValuesPlaceholder={"Er zijn (nog) geen zaken gevonden"}
  />)
}

export default TableCases
