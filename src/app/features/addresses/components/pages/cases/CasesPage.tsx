import React from "react"
import { RouteComponentProps } from "@reach/router"
import { themeSpacing } from "@datapunt/asc-ui"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import DetailHeader from "app/features/shared/components/organisms/DetailHeader/DetailHeader"
import Heading from "app/features/addresses/components/molecules/Heading/Heading"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const CasesPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
    <DefaultLayout>
      <RowWithColumn marginBottom={themeSpacing(10)}>
        <DetailHeader bagId={ bagId! } />
      </RowWithColumn>
      <RowWithColumn>
        <Heading />
      </RowWithColumn>
      <RowWithColumn>
        <p>Cases (via BAG id)</p>
      </RowWithColumn>
    </DefaultLayout>
  )

export default CasesPage
