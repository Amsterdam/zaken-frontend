import styled from "styled-components"
import { Heading, themeSpacing } from "@amsterdam/asc-ui"

import { useCasesByBagId } from "app/state/rest"
import { Table } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"
import { columnsClosedCases, columnsOpenCases } from "./columns"

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
const Div = styled.div`
  margin-bottom: ${ themeSpacing(8) };
`

const CasesByBagId: React.FC<Props> = ({ bagId, openCases = false, title = defaultTitle, emptyText = defaultEmptyText }) => {
  const [data, { isBusy }] = useCasesByBagId(bagId)
  const caseList = data?.results?.filter(result => openCases ? result.end_date === null : result.end_date !== null) || []
  const numCases = caseList.length
  const onClickRow = (data: any) => {
    navigateTo("/zaken/:id", { id: data.id })
  }

  return (
    <Div>
      <StyledHeading as={"h2"}>{ title }{ numCases > 0 && ` (${ numCases })` }</StyledHeading>
      <Table
        hasFixedColumn
        columns={ openCases ? columnsOpenCases : columnsClosedCases }
        loading={ isBusy }
        numLoadingRows={ 1 }
        data={ caseList }
        showHeadWhenEmpty={ false }
        onClickRow={ onClickRow }
        emptyPlaceholder={ emptyText }
      />
    </Div>
  )
}
export default CasesByBagId