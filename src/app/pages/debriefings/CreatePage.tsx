import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle, Heading, Spinner } from "@amsterdam/asc-ui"

import { useCase } from "app/state/rest/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DebriefForm from "app/features/debriefings/components/DebriefForm/DebriefForm"
import usePageDebriefing from "./hooks/usePageDebriefing"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import CaseHeading from "app/features/cases/components/CaseHeading/CaseHeading"

type Props = {
  id: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {
  const id = parseUrlParamId(idString)

  const { data } = useCase(id)
  const { handleCreate } = usePageDebriefing(id!)

  return (
    isValidUrlParamId<Components.Schemas.Case["id"]>(id) ?
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        { data === undefined ?
          <Spinner /> :
          <>
            <Heading as="h2">Nieuwe debrief</Heading>
            <CaseHeading id={ id } />
            <FormTitle>Gebruik dit formulier om terugkoppeling te geven van een debrief</FormTitle>
            <DebriefForm caseId={ id! } onSubmit={ handleCreate } />
          </>
        }
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CreatePage
