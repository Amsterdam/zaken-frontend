import React from "react"
import { RouteComponentProps } from "@reach/router"

import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Row, { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import Column from "app/features/shared/components/atoms/Grid/Column"
import DetailHeader from "app/features/shared/components/molecules/DetailHeader/DetailHeader"
import People from "app/features/addresses/People/People"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import MockWrapper from "app/features/shared/components/molecules/MockWrapper/MockWrapper"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"

type Props = {
  bagId: string
}

const PeoplePage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  isValidUrlParamBAGId(bagId) ?
    <DefaultLayout>
      <DetailHeader bagId={ bagId } />
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <Row>
        <Column spanLarge={ 50 }>
          <MockWrapper>
            <People bagId={ bagId } />
          </MockWrapper>
        </Column>
      </Row>
    </DefaultLayout> :
    <NotFoundPage />
)

export default PeoplePage
