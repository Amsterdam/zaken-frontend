import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Button, Divider, Heading, themeSpacing } from "@amsterdam/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import TimelineContainer from "app/features/cases/CaseTimeline/TimelineContainer"
import CaseDetails from "app/features/cases/CaseDetails/CaseDetails"
import Workflow from "app/features/cases/Workflow/Workflow"
import styled from "styled-components"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/routing/utils/to"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"
import DetailHeaderByCaseId from "app/features/shared/components/molecules/DetailHeader/DetailHeaderByCaseId"

type Props = {
  id: string
}

const ButtonWrapper = styled.div`
  float: right;

  &:after {
    clear: right;
    float: none;
  }

  button {
    margin-left: ${ themeSpacing(2) };
  }
`

const ButtonTertiary = styled(Button)`
  color: black;
`

const DetailsPage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {

  const id = parseUrlParamId(idString)

  return (
    isValidUrlParamId<Components.Schemas.Case["id"]>(id) ?
    <DefaultLayout>
      <DetailHeaderByCaseId caseId={ id } enableSwitch={ false } />
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <CaseDetails caseId={ id } />
      </RowWithColumn>
      <RowWithColumn>
        <Heading as="h2">
          Status
          <ButtonWrapper>
            <ButtonLink to={ to("/zaken/:id/correspondentie", { id })}>
              <ButtonTertiary variant="tertiary">Correspondentie</ButtonTertiary>
            </ButtonLink>
            <ButtonLink to={ to("/zaken/:id/afronden", { id })}>
              <ButtonTertiary variant="tertiary">Afronden</ButtonTertiary>
            </ButtonLink>
          </ButtonWrapper>
        </Heading>
        <Divider />
      </RowWithColumn>
      <RowWithColumn>
        {/* TODO-MOCKED summonId has to come from useCaseEvents, so summonId can be removed here */}
        <Workflow caseId={ id } summonId={ 6 } />
      </RowWithColumn>
      <RowWithColumn>
        <Heading as="h2">Zaakhistorie</Heading>
        <Divider />
      </RowWithColumn>
      <RowWithColumn>
        <TimelineContainer caseId={ id } />
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default DetailsPage
