import React, { useMemo } from "react"

import Table from "app/features/shared/components/molecules/Table/Table"

import { useCaseIndexData } from "./hooks/useCaseIndexData"
import { Button } from "@datapunt/asc-ui"
import { ChevronRight } from "@datapunt/asc-assets/lib"

const OpenButton: React.FC = () =>
  <Button variant="textButton" iconSize={14} iconLeft={<ChevronRight />}>Open</Button>

const columns = [
  { header:"Startdatum", minWidth: 100 },
  { header:"Einddatum", minWidth: 100 },
  { header:"Omschrijving", minWidth: 300 },
  { minWidth: 90 }
]

const mapData = (data: API.Case) => [
  data.startdatum,
  data.einddatum ?? "-",
  data.omschrijving,
  <OpenButton />
]

const CaseIndexTable: React.FC = () => {
  const { data, isFetching } = useCaseIndexData()
  const mappedData = useMemo(() => data?.map(mapData), [ data ])

  return (<Table
    columns={columns}
    data={mappedData}
    loading={data === undefined || isFetching}
    hasFixedColumn={true}
  />)
}

export default CaseIndexTable
