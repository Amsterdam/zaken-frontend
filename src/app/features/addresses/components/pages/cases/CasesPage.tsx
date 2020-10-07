import React from "react"
import { RouteComponentProps } from "@reach/router"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import DetailHeader from "app/features/shared/components/organisms/DetailHeader/DetailHeader"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const CasesPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
    <DefaultLayout>
      <DetailHeader bagId={ bagId! } />
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <p>Cases (via BAG id)</p>
      </RowWithColumn>
    </DefaultLayout>
  )

export default CasesPage
