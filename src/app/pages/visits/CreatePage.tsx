import React from "react"
import { navigate, RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import AddressHeading from "app/features/shared/components/molecules/AddressHeading/AddressHeading"
import VisitForm from "app/features/visits/components/CreateForm/CreateForm"
import { useVisitsCreate } from "app/state/rest"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import to from "app/features/shared/routing/to"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"

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
    navigate(to(path))
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
        <FormTitle>Gebruik dit formulier om een huisbezoek aan te maken</FormTitle>
        <AddressHeading caseId={ id } />
        <VisitForm caseId={ id } onSubmit={ onSubmit } />
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CreatePage
