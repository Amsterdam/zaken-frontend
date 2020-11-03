import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle, Heading, Button } from "@datapunt/asc-ui"

import { useCase, useDebriefings } from "app/state/rest/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DebriefForm from "app/features/debriefings/components/molecules/DebriefForm/DebriefForm"
import usePageDebriefing from "./hooks/usePageDebriefing"

type Props = {
  caseId: string
  id: string
}

const CONFIRM_TEXT = "Weet je zeker dat je deze debriefing wilt verwijderen?"

const EditPage: React.FC<RouteComponentProps<Props>> = ({ caseId: caseIdString, id: idString }) => {
  const caseId: Components.Schemas.Case["id"] = parseInt(caseIdString!)
  const id: Components.Schemas.Debriefing["id"] = parseInt(idString!)

  const { data: caseData } = useCase(caseId)
  const { data } = useDebriefings(id)
  const { handleUpdate, handleDelete } = usePageDebriefing(caseId!, id!)
  const onDelete = () => {
    if (!window.confirm(CONFIRM_TEXT)) return
    handleDelete()
  }

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
            <Heading as="h2">Debrief</Heading>
            <Button variant="secondary" onClick={ onDelete }>Terugkoppeling verwijderen</Button>
            <FormTitle>Gebruik dit formulier om terugkoppeling te wijzigen</FormTitle>
            <Heading as="h3">Adres</Heading>
            <p>{ caseData!.address.street_name }</p>
            <p>{ caseData!.address.postal_code }</p>
            <DebriefForm caseId={ caseId! } onSubmit={ handleUpdate } initialValues={ data } isLoading={ data === undefined } />
          </>
        }
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default EditPage
