import React from "react"
import { RouteComponentProps } from "@reach/router"

import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import DetailHeader from "app/features/shared/components/molecules/DetailHeader/DetailHeader"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import CasesByBagId from "app/features/addresses/components/CasesByBagId/CasesByBagId"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const CasesPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  isValidUrlParamId(bagId) ?
    <DefaultLayout>
      <DetailHeader bagId={ bagId } />
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <CasesByBagId bagId={ bagId } />
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
)

export default CasesPage
