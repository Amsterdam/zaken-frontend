import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import Row, { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import VisitForm from "app/features/visits/components/CreateForm/CreateForm"
import { useVisitsCreate } from "app/state/rest"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"
import navigateTo from "app/routing/navigateTo"
import CaseHeading from "app/features/cases/components/CaseHeading/CaseHeading"
import { Column } from "app/features/shared/components/atoms/Grid"

type Props = {
  id: string
}
export type VisitData = Omit<Components.Schemas.Visit, "author_ids"> & { author1: string, author2: string }

const mapData = (data: VisitData) => ({ ...data, author_ids: [data.author1, data.author2] })

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {
  const id = parseUrlParamId(idString)
  const { execPost } = useVisitsCreate()
  const { addSuccessFlashMessage } = useFlashMessages()

  const onSubmit = async (data: VisitData) => {
    await execPost(mapData(data))
    const path = `/zaken/${ data.case }`
    addSuccessFlashMessage(path, "Succes", "Het resultaat huisbezoek is succesvol verwerkt")
    navigateTo(path)
  }

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
        <CaseHeading id={ id } />
      </RowWithColumn>
      <Row>
        <Column spanLarge={50}>
          <FormTitle>Gebruik dit formulier om een huisbezoek aan te maken</FormTitle>
          <VisitForm caseId={ id } onSubmit={ onSubmit } />
        </Column>
      </Row>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CreatePage
