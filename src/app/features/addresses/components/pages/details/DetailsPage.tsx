import React from "react"
import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Row, { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import Column from "app/features/shared/components/atoms/Grid/Column"
import DetailHeader from "app/features/shared/components/organisms/DetailHeader/DetailHeader"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import ObjectDetails from "app/features/addresses/components/atoms/ObjectDetails/ObjectDetails"
import PermitOverview from "app/features/permits/components/organisms/PermitOverview/PermitOverview"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const DetailPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
    <DefaultLayout>
      <RowWithColumn>
        <DetailHeader bagId={ bagId! } />
      </RowWithColumn>
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
          <PermitOverview bagId={ bagId! }></PermitOverview>
        </Column>
      </Row>
    </DefaultLayout>
  )

export default DetailPage
