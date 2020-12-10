import React from "react"
import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Row, { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import Column from "app/features/shared/components/atoms/Grid/Column"
import DetailHeader from "app/features/shared/components/molecules/DetailHeader/DetailHeader"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import ObjectDetails from "app/features/addresses/components/ObjectDetails/ObjectDetails"
import PermitOverview from "app/features/permits/components/PermitOverview/PermitOverview"
import MockWrapper from "app/features/shared/components/molecules/MockWrapper/MockWrapper"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const DetailPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
    <DefaultLayout>
      <DetailHeader bagId={ bagId! } />
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <Row>
        <Column spanLarge={50}>
          <ObjectDetails bagId={ bagId ! } />
        </Column>
      </Row>
      <Row>
        <Column spanLarge={50}>
          <MockWrapper>
            <PermitOverview bagId={ bagId! }></PermitOverview>
          </MockWrapper>
        </Column>
      </Row>
    </DefaultLayout>
  )

export default DetailPage
