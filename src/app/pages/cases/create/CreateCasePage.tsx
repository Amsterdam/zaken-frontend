import React from "react"
import { RouteComponentProps } from "@reach/router"

import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Breadcrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const CreateCasePage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
    <DefaultLayout>
      <RowWithColumn>
        <Breadcrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        form
      </RowWithColumn>
    </DefaultLayout>
  )

export default CreateCasePage