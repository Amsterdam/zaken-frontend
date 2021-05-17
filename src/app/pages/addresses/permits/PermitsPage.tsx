
import { RouteComponentProps } from "@reach/router"
import { Link } from "@amsterdam/asc-ui"

import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import PermitDetailsList from "app/components/permits/PermitDetails/PermitDetailsList"
import VacationRental from "app/components/permits/VacationRental/VacationRental"
import DetailHeader from "app/components/shared/DetailHeader/DetailHeader"
import Column from "app/components/layouts/Grid/Column"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"

type Props = {
  bagId: string
}

const PermitsPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  isValidUrlParamBAGId(bagId) ?
    <DefaultLayout>
      <Row>
        <Column spanLarge={ 50 }>
          <PageHeading />
        </Column>
        <Column spanLarge={ 50 }>
          <DetailHeader bagId={ bagId } />
        </Column>
      </Row>
      <Row>
        <Column spanLarge={ 50 }>
          <PermitDetailsList bagId={ bagId }></PermitDetailsList>
        </Column>
        <Column spanLarge={ 50 }>
          <VacationRental bagId={ bagId }></VacationRental>
        </Column>
      </Row>
      <RowWithColumn>
        {/* TODO: make hardcoded link dynamic */}
        <Link href="https://decosdvl.amsterdam.nl/" variant="inline" icon="external" target="_blank" rel="noreferer">
          Alle vergunningen zie Decos Join
        </Link>
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
)

export default  PermitsPage
