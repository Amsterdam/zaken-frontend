
import { RouteComponentProps } from "@reach/router"
import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import DetailHeader from "app/components/shared/DetailHeader/DetailHeader"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import CasesByBagId from "app/components/addresses/CasesByBagId/CasesByBagId"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import Column from "app/components/layouts/Grid/Column"
import to from "app/routing/utils/to"
import IsAuthorizedButtonLink from "app/components/shared/ButtonLink/IsAuthorizedButtonLink"

type Props = {
  bagId: string
}

const CasesPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
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
      <RowWithColumn>
        <CasesByBagId bagId={ bagId } />
        <span >
          Let op: in BWV (-archief) kunnen er ook lopende en afgesloten zaken bekend zijn.<br/>
          Dit overzicht toont alle zaken die bekend zijn in AZA. 
        </span>
      </RowWithColumn>
      <RowWithColumn>
        <IsAuthorizedButtonLink
          permissionName="create_case"
          to={ to("/adres/:bagId/zaken/nieuw", { bagId }) }
          text="Nieuwe zaak aanmaken"
          variant="primary"
        />
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
)

export default CasesPage
