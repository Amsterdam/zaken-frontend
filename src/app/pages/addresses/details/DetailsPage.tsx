import React from "react"
import { RouteComponentProps } from "@reach/router"

import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Row, { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import Column from "app/features/shared/components/atoms/Grid/Column"
import DetailHeader from "app/features/shared/components/molecules/DetailHeader/DetailHeader"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import ObjectDetails from "app/features/addresses/components/ObjectDetails/ObjectDetails"
import PermitOverview from "app/features/permits/components/PermitOverview/PermitOverview"
import MockWrapper from "app/features/shared/components/molecules/MockWrapper/MockWrapper"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const DetailPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  isValidUrlParamId(bagId) ?
    <DefaultLayout>
      <DetailHeader bagId={ bagId } />
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <Row>
        <Column spanLarge={50}>
          <ObjectDetails bagId={ bagId } />
        </Column>
      </Row>
      <Row>
        <Column spanLarge={50}>
          <MockWrapper>
            <PermitOverview bagId={ bagId }></PermitOverview>
          </MockWrapper>
        </Column>
      </Row>
    </DefaultLayout> :
    <NotFoundPage />
)

export default DetailPage
