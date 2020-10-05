import React from "react"
import { RouteComponentProps } from "@reach/router"
import { themeSpacing } from "@datapunt/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DetailHeader from "app/features/shared/components/organisms/DetailHeader/DetailHeader"
import People from "app/features/addresses/components/organisms/People/People"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}


const PeoplePage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
    <DefaultLayout>
      <RowWithColumn marginBottom={themeSpacing(10)}>
        <DetailHeader bagId={ bagId! } />
      </RowWithColumn>
      <RowWithColumn>
        <People bagId={ bagId! } />
      </RowWithColumn>
    </DefaultLayout>
  )

export default PeoplePage
