import styled from "styled-components"
import { Heading, themeSpacing } from "@amsterdam/asc-ui"

import { useCasesByBagId } from "app/state/rest"
import useValues from "./hooks/useValues"
import Table from "app/components/shared/Table/Table"

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

const CasesByBagId: React.FC<Props> = ({ bagId, openCases = false, title = defaultTitle, emptyText = defaultEmptyText }) => {

  const [data, { isBusy }] = useCasesByBagId(bagId, openCases)
  const values = useValues(data?.results)
  const numCases = data?.results?.length ?? 0

  return (
    <>
      <StyledHeading>{ title }{ numCases > 0 && ` (${ numCases })` }</StyledHeading>
      <Table
        hasFixedColumn
        columns={ columns }
        loading={ isBusy }
        numLoadingRows={ 1 }
        data={ values }
        showHeadWhenEmpty={ false }
        noValuesPlaceholder={ emptyText }
      />
    </>
  )
}
export default CasesByBagId