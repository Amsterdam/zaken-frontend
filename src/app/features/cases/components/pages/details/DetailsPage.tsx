import React from "react"
import { RouteComponentProps } from "@reach/router"

import { useCase } from "app/state/rest"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DetailHeader from "app/features/shared/components/organisms/DetailHeader/DetailHeader"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import { Divider, Heading } from "@datapunt/asc-ui"

import TimelineContainer from "../../organisms/CaseTimeline/TimelineContainer"

type Props = {
  id: NonNullable<Components.Schemas.Case["identification"]>
}

const DetailsPage: React.FC<RouteComponentProps<Props>> = ({ id }) => {
  const { data: caseData } = useCase(id!)
  const bagId = caseData?.address.bag_id

  return (
    <DefaultLayout>
      <DetailHeader bagId={ bagId! } enableSwitch={false} />
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <Heading as="h2">Zaak historie</Heading>
        <Divider />
      </RowWithColumn>
      <RowWithColumn>
        <TimelineContainer caseId={id} />
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default DetailsPage
