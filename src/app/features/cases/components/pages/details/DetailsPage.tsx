import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Divider, Heading } from "@datapunt/asc-ui"

import { useCase, useCaseEvents } from "app/state/rest"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DetailHeader from "app/features/shared/components/molecules/DetailHeader/DetailHeader"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"

import TimelineContainer from "app/features/cases/components/organisms/CaseTimeline/TimelineContainer"
import CreateDebriefingLink from "app/features/cases/components/organisms/CreateDebriefingLink/CreateDebriefingLink"
import canCreateDebriefing from "app/state/workflow/canCreateDebriefing"

type Props = {
  id: Components.Schemas.Case["id"]
}

const DetailsPage: React.FC<RouteComponentProps<Props>> = ({ id }) => {
  const { data: caseData } = useCase(id!)
  const bagId = caseData?.address.bag_id

  const { data: caseEvents } = useCaseEvents(id!)
  const showCreateDebriefingLink = canCreateDebriefing(caseEvents)

  return (
    <DefaultLayout>
      <DetailHeader bagId={ bagId! } enableSwitch={false} />
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <Heading as="h2">Open taken</Heading>
        { showCreateDebriefingLink &&
          <CreateDebriefingLink id={ id! } />
        }
      </RowWithColumn>
      <RowWithColumn>
        <Heading as="h2">Zaak historie</Heading>
        <Divider />
      </RowWithColumn>
      <RowWithColumn>
        <TimelineContainer caseId={id!} />
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default DetailsPage
