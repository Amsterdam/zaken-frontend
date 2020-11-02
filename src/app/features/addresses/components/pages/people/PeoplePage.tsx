import React from "react"
import { RouteComponentProps } from "@reach/router"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Row, { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import Column from "app/features/shared/components/atoms/Grid/Column"
import DetailHeader from "app/features/shared/components/molecules/DetailHeader/DetailHeader"
import People from "app/features/addresses/components/organisms/People/People"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const PeoplePage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
    <DefaultLayout>
      <DetailHeader bagId={ bagId! } />
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <Row>
        <Column spanLarge={50}>
          <People bagId={ bagId! } />
        </Column>
      </Row>
    </DefaultLayout>
  )

export default PeoplePage
