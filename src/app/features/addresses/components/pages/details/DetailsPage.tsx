import React from "react"
import { RouteComponentProps } from "@reach/router"
import {   themeSpacing } from "@datapunt/asc-ui"


import routesObject from "app/config/routes"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import BagDetails from "app/features/cases/components/organisms/BagDetails/BagDetails"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DetailHeader from "app/features/shared/components/organisms/DetailHeader/DetailHeader"
import HeadingWithIcon from "app/features/shared/components/organisms/HeadingWithIcon/HeadingWithIcon"
import ObjectDetails from "app/features/addresses/components/atoms/ObjectDetails/ObjectDetails"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const route = "/adres/:bagId/detail/"

const DetailPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => {
  const page = routesObject[route]
  
  return (
    <DefaultLayout>
      <RowWithColumn marginBottom={ themeSpacing(2) }>
        <DetailHeader bagId={ bagId! } />
      </RowWithColumn>
      <RowWithColumn>
        <HeadingWithIcon icon={ page?.icon ?? "ChevronRight" } header={ page?.title ?? "" } />
      </RowWithColumn>
      <RowWithColumn>
        <ObjectDetails bagId={ bagId ! } />
      </RowWithColumn>
      <RowWithColumn>
        <BagDetails bagId={ bagId ! } />
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default DetailPage
