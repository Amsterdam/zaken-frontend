import React, { useMemo } from "react"
import { DateDisplay } from "@amsterdam/wonen-ui"

import to from "app/routing/utils/to"
import Table from "app/components/shared/Table/Table"
import OpenButton from "app/components/shared/OpenButton/OpenButton"

type Props = {
  data?: Components.Schemas.PaginatedCaseList
  isBusy: boolean
}

const columns = [
  { header: "Adres", minWidth: 300 },
  { header: "Status", minWidth: 100 },
  { header: "Laatst gewijzigd", minWidth: 100 },
  { minWidth: 140 }
]

const mapData = (data: Components.Schemas.Case) => (
  {
    href: to("/zaken/:id", { id: data.id }),
    itemList: [
      data.address.full_address ?? "-",
      data.current_states.length > 0 ? data.current_states.map(({ status_name }) => status_name).join(", ") : undefined,
      data.current_states.length > 0 ? (
        <>
          { data.current_states
            .map(({ start_date }, index) => (
              <DateDisplay key={ `${ start_date }_${ index }` } date={ start_date } />
            ))
            .reduce((acc, elem) =>
              acc.length === 0 ? [elem] : [...acc, ", ", elem],
              [] as React.ReactChild[]
            )
          }
        </>) :
        "-",
      <OpenButton href={to("/zaken/:id", { id: data.id })} text="Zaakdetails" />
    ]
  }
)

const TableCases: React.FC<Props> = ({ data, isBusy }) => {
  const mappedData = useMemo(() => data?.results?.map(mapData), [ data ])

  return (<Table
    columns={columns}
    data={mappedData}
    loading={data === undefined || isBusy}
    numLoadingRows={10}
    hasFixedColumn={true}
    noValuesPlaceholder={"Er zijn geen zaken voor deze dag"}
  />)
}

export default TableCases
