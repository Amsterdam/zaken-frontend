import styled from "styled-components"
import { Heading, themeSpacing } from "@amsterdam/asc-ui"

import { useCasesByBagId } from "app/state/rest"
import { Table } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"
import columns from "./columns"

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
  const [data, { isBusy }] = useCasesByBagId(bagId, openCases)
  const numCases = data?.results?.length ?? 0

  const onClickRow = (data: any) => {
    navigateTo("/zaken/:id", { id: data.id })
  }

  return (
    <Div>
      <StyledHeading>{ title }{ numCases > 0 && ` (${ numCases })` }</StyledHeading>
      <Table
        hasFixedColumn
        columns={ columns }
        loading={ isBusy }
        numLoadingRows={ 1 }
        data={ data?.results || [] }
        showHeadWhenEmpty={ false }
        onClickRow={ onClickRow }
        emptyPlaceholder={ emptyText }
      />
    </Div>
  )
}
export default CasesByBagId