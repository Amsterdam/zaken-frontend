import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Button, Divider, Heading, themeSpacing } from "@amsterdam/asc-ui"

import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import Row, { RowWithColumn } from "app/components/layouts/Grid/Row"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import TimelineContainer from "app/components/cases/CaseTimeline/TimelineContainer"
import CaseDetails from "app/components/cases/CaseDetails/CaseDetails"
import Workflow from "app/components/cases/Workflow/Workflow"
import styled from "styled-components"
import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"
import to from "app/routing/utils/to"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import DetailHeaderByCaseId from "app/components/shared/DetailHeader/DetailHeaderByCaseId"
import { Column } from "app/components/layouts/Grid"

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
      <Row>
        <Column spanLarge={ 48 }>
          <CaseDetails caseId={ id } />
        </Column>
      </Row>
      <RowWithColumn>
        <Heading as="h2">
          Status
          <ButtonWrapper>
            <ButtonLink to={ to("/zaken/:id/correspondentie", { id }) }>
              <ButtonTertiary variant="tertiary">Correspondentie</ButtonTertiary>
            </ButtonLink>
            <ButtonLink to={ to("/zaken/:id/afronden", { id }) }>
              <ButtonTertiary variant="tertiary">Afronden</ButtonTertiary>
            </ButtonLink>
          </ButtonWrapper>
        </Heading>
        <Divider />
      </RowWithColumn>
      <RowWithColumn>
        {/* TODO-MOCKED summonId has to come from useCaseEvents, so summonId can be removed here */}
        <Workflow caseId={ id } />
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
