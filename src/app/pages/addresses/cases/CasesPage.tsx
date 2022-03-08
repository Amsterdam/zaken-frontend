
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
import { useCasesByBagId } from "app/state/rest"

type Props = {
  bagId: string
}

const CasesPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => {

  const [data] = useCasesByBagId(bagId as string)
  const numCases = data?.results?.length ?? 0

  return (
    isValidUrlParamBAGId(bagId) ?
    <DefaultLayout>
      <Row>
        <Column spanLarge={ 50 }>
          <PageHeading titlePostFix={`(${ numCases })`}/>
        </Column>
        <Column spanLarge={ 50 }>
          <DetailHeader bagId={ bagId } />
        </Column>
      </Row>
      <RowWithColumn>
        <span >
          Let op: in BWV kunnen er ook open en gesloten zaken bekend zijn.<br/>
          Onderstaand overzicht toont alle zaken die bekend zijn in AZA.
        </span>
      </RowWithColumn>
      <RowWithColumn>
        <CasesByBagId
          title="Open zaken"
          bagId={ bagId }
          openCases={true}
          emptyText="Op dit adres zijn geen open zaken"
        />
      </RowWithColumn>
      <RowWithColumn>
        <CasesByBagId
          title="Gesloten zaken AZA"
          bagId={ bagId }
          emptyText="Op dit adres zijn geen gesloten zaken"
        />
      </RowWithColumn>
      <RowWithColumn>
        <IsAuthorizedButtonLink
          permissionNames={["create_case"]}
          to={ to("/adres/:bagId/zaken/nieuw", { bagId }) }
          text="Nieuwe zaak aanmaken"
          variant="primary"
        />
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CasesPage
