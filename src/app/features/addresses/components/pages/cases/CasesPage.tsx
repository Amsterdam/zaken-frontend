import React from "react"
import { RouteComponentProps } from "@reach/router"
import { themeSpacing } from "@datapunt/asc-ui"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PanoramaPreview from "app/features/cases/components/organisms/Panorama/PanoramaPreview"
import DetailHeader from "app/features/shared/components/organisms/DetailHeader/DetailHeader"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const CasesPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
    <DefaultLayout>
      <RowWithColumn marginBottom={themeSpacing(10)}>
        <DetailHeader bagId={ bagId! } />
      </RowWithColumn>
      <RowWithColumn>
        <PanoramaPreview bagId={ bagId! } />
      </RowWithColumn>
      <RowWithColumn>
        <p>Cases (via BAG id)</p>
      </RowWithColumn>
    </DefaultLayout>
  )

export default CasesPage
