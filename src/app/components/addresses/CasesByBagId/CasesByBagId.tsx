import { useMemo } from "react"
import styled from "styled-components"
import { Heading, Spinner, themeSpacing } from "@amsterdam/asc-ui"
import { CaseIdDisplay, DateDisplay } from "@amsterdam/wonen-ui"

import { useCasesByBagId } from "app/state/rest"
import to from "app/routing/utils/to"
import Table from "app/components/shared/Table/Table"
import OpenButton from "app/components/shared/OpenButton/OpenButton"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
  openCases?: boolean
  title?: string
  emptyText?: string
}

const defaultTitle = "Zaken"
const defaultEmptyText = "Op dit adres zijn er geen zaken"

const StyledHeading = styled(Heading)`
  margin-bottom: ${ themeSpacing(4) };
`

const columns = [
  { header: "Zaak ID", minWidth: 100 },
  { header: "Thema", minWidth: 100 },
  { header: "Startdatum", minWidth: 100 },
  { header: "Huidige status", minWidth: 100 },
  { minWidth: 140 }
]

const mapData = (data: Components.Schemas.Case) =>
  ({
    href: to("/zaken/:id", { id: data.id }),
    itemList: [
      <CaseIdDisplay id={ data.id } />,
      data.team.name,
      data.start_date ? <DateDisplay date={ data.start_date } /> : "-",
      data.current_states.length > 0 ? data.current_states.map(({ status_name }) => status_name).join(", ") : "-",
      <OpenButton href={ to("/zaken/:id", { id: data.id }) } text="Zaakdetails" />
    ]
  })

const CasesByBagId: React.FC<Props> = ({ bagId, openCases, title = defaultTitle, emptyText = defaultEmptyText }) => {

  const [data] = useCasesByBagId(bagId, openCases)
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