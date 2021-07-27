
import { RouteComponentProps } from "@reach/router"
import { Button } from "@amsterdam/asc-ui"
import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import DetailHeader from "app/components/shared/DetailHeader/DetailHeader"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import CasesByBagId from "app/components/addresses/CasesByBagId/CasesByBagId"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import Column from "app/components/layouts/Grid/Column"
import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"
import to from "app/routing/utils/to"
import IsAuthorizedWrapper from "app/components/auth/IsAuthorizedWrapper/IsAuthorizedWrapper"

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
      </RowWithColumn>
      <IsAuthorizedWrapper permissionName="add_case">
        <RowWithColumn>
          <ButtonLink to={ to("/adres/:bagId/zaken/nieuw", { bagId })}>
            <Button variant="primary" as="span">Nieuwe zaak aanmaken</Button>
          </ButtonLink>
        </RowWithColumn>
      </IsAuthorizedWrapper>
    </DefaultLayout> :
    <NotFoundPage />
)

export default CasesPage
