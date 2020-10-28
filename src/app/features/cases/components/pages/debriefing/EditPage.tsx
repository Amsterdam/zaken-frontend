import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle, Heading } from "@datapunt/asc-ui"

import { useCase, useDebriefings } from "app/state/rest/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DebriefForm from "app/features/cases/components/organisms/DebriefForm/DebriefForm"
import useDebriefing from "./hooks/useDebriefing"

type Props = {
  caseId: string
  id: string
}

const EditPage: React.FC<RouteComponentProps<Props>> = ({ caseId: caseIdString, id: idString }) => {
  const caseId: Components.Schemas.Case["id"] = parseInt(caseIdString!)
  const id: Components.Schemas.Debriefing["id"] = parseInt(idString!)

  const { data: caseData } = useCase(caseId)
  const { data } = useDebriefings(id)
  const { handleUpdate } = useDebriefing(caseId!, id!)
  const showForm = caseData !== undefined && data !== undefined

  return (
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        { showForm &&
          <>
            <Heading as="h2">Nieuwe debrief</Heading>
            <FormTitle>Gebruik dit formulier om terugkoppeling te geven van een debrief</FormTitle>
            <Heading as="h3">Adres</Heading>
            <p>{ caseData!.address.street_name }</p>
            <p>{ caseData!.address.postal_code }</p>
            <DebriefForm caseId={ caseId! } onSubmit={ handleUpdate } initialValues={ data } />
          </>
        }
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default EditPage
