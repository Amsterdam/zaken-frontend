
import { RouteComponentProps } from "@reach/router"

import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import Row from "app/components/layouts/Grid/Row"
import Column from "app/components/layouts/Grid/Column"
import DetailHeader from "app/components/shared/DetailHeader/DetailHeader"
import People from "app/components/addresses/People/People"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import NotFoundPage from "app/pages/errors/NotFoundPage"

type Props = {
  bagId: string
}

const PeoplePage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  isValidUrlParamBAGId(bagId) ? (
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
          <People bagId={ bagId } />
        </Column>
      </Row>
    </DefaultLayout>
  ) : <NotFoundPage />
)

export default PeoplePage
