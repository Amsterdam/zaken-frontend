import React, { useMemo } from "react"
import styled from "styled-components"
import { Heading, Spinner, themeSpacing } from "@amsterdam/asc-ui"

import { useCasesByBagId } from "app/state/rest"
import to from "app/features/shared/routing/to"
import Table from "app/features/shared/components/molecules/Table/Table"
import OpenButton from "app/features/shared/components/atoms/OpenButton/OpenButton"
import DateDisplay from "app/features/shared/components/atoms/DateDisplay/DateDisplay"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const title = "Lopende zaken"
const emptyText = "Op dit adres zijn er geen lopende zaken"

const StyledHeading = styled(Heading)`
  margin-bottom: ${ themeSpacing(4) };
`

const columns = [
  { header: "ZaakId", minWidth: 100 },
  { header: "Team", minWidth: 100 },
  { header: "Startdatum", minWidth: 100 },
  { header: "Huidige status", minWidth: 100 },
  { minWidth: 140 }
]

const mapData = (data: Components.Schemas.Case) =>
  ({
    href: to("/cases/:id", { id: data.id }),
    itemList: [
      data.id,
      data.team.name,
      data.start_date ? <DateDisplay date={ data.start_date } /> : "-",
      data.current_state ?? "-",
      <OpenButton href={ to("/cases/:id", { id: data.id }) } text="Zaakdetails" />
    ]
  })

const CasesByBagId: React.FC<Props> = ({ bagId }) => {

  const { data } = useCasesByBagId(bagId)
  const mappedData = useMemo(() => data?.results?.map(mapData), [ data ])
  const length = data?.results?.length
  const hasCases = length !== undefined && length > 0

  return (
    <>
      <StyledHeading>{ title }{ hasCases && ` (${ length })` }</StyledHeading>
      { data === undefined ?
          <Spinner /> :
          hasCases ?
            <Table
              columns={ columns }
              data={ mappedData }
              loading={ false }
              numLoadingRows={ 1 }
              hasFixedColumn={ true }
              noValuesPlaceholder=""
            /> :
            <p>{ emptyText }</p>
      }
    </>
  )
}
export default CasesByBagId