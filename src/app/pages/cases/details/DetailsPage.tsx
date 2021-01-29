import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Button, Divider, Heading, themeSpacing } from "@amsterdam/asc-ui"

import { useCase } from "app/state/rest"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Row, { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DetailHeader from "app/features/shared/components/molecules/DetailHeader/DetailHeader"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import TimelineContainer from "app/features/cases/components/CaseTimeline/TimelineContainer"
import CaseDetails from "app/features/cases/components/CaseDetails/CaseDetails"
import Workflow from "app/features/cases/components/Workflow/Workflow"
import { Column } from "app/features/shared/components/atoms/Grid"
import styled from "styled-components"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamCaseId from "app/routing/utils/isValidUrlParamCaseId"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"

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
  const { data } = useCase(id)
  const bagId = data?.address.bag_id

  return (
    isValidUrlParamCaseId(id) ?
    <DefaultLayout>
      { bagId &&
        <DetailHeader bagId={ bagId } enableSwitch={ false } />
      }
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <Row>
        <Column spanLarge={50}>
          <CaseDetails caseId={ id! } />
        </Column>
      </Row>
      <RowWithColumn>
        <Heading as="h2">
          Status
          <ButtonWrapper>
            <ButtonLink to={ to("/zaken/:id/correspondence", { id: id })}>
              <ButtonTertiary variant="tertiary">Correspondentie</ButtonTertiary>
            </ButtonLink>
            <ButtonLink to={ to("/zaken/:id/afronden", { id: id })}>
              <ButtonTertiary variant="tertiary">Afronden</ButtonTertiary>
            </ButtonLink>
          </ButtonWrapper>
        </Heading>
        <Divider />
      </RowWithColumn>
      <RowWithColumn>
        {/* TODO-MOCKED summonId has to come from useCaseEvents, so summonId can be removed here */}
        <Workflow caseId={ id! } summonId={6} />
      </RowWithColumn>
      <RowWithColumn>
        <Heading as="h2">Zaakhistorie</Heading>
        <Divider />
      </RowWithColumn>
      <RowWithColumn>
        <TimelineContainer caseId={ id! } />
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default DetailsPage
