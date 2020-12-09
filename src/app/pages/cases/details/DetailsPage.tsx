import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Divider, Heading } from "@amsterdam/asc-ui"

import { useCase } from "app/state/rest"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DetailHeader from "app/features/shared/components/molecules/DetailHeader/DetailHeader"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"

import TimelineContainer from "app/features/cases/components/molecules/CaseTimeline/TimelineContainer"
import Workflow from "app/features/cases/components/molecules/Workflow/Workflow"

type Props = {
  id: Components.Schemas.Case["id"]
}

const DetailsPage: React.FC<RouteComponentProps<Props>> = ({ id }) => {
  const { data: caseData } = useCase(id!)
  const bagId = caseData?.address.bag_id

  return (
    <DefaultLayout>
      { bagId &&
        <DetailHeader bagId={ bagId } enableSwitch={ false } />
      }
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <Workflow caseId={ id! } />
      </RowWithColumn>
      <RowWithColumn>
        <Heading as="h2">Zaakhistorie</Heading>
        <Divider />
      </RowWithColumn>
      <RowWithColumn>
        <TimelineContainer caseId={ id! } />
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default DetailsPage
