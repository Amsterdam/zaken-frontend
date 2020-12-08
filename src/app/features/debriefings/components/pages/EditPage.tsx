import React, { useState } from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle, Heading, Button } from "@amsterdam/asc-ui"
import DeleteOutline from "@material-ui/icons/DeleteOutline"

import { useCase, useDebriefings } from "app/state/rest/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import AddressHeading from "app/features/debriefings/components/molecules/AddressHeading/AddressHeading"
import DebriefForm from "app/features/debriefings/components/molecules/DebriefForm/DebriefForm"
import usePageDebriefing from "./hooks/usePageDebriefing"

type Props = {
  caseId: string
  id: string
}

const CONFIRM_TEXT = "Weet je zeker dat je deze debriefing wilt verwijderen?"

const EditPage: React.FC<RouteComponentProps<Props>> = ({ caseId: caseIdString, id: idString }) => {
  // TODO: Fix showing 404 for NaN
  const caseId: Components.Schemas.Case["id"] = parseInt(caseIdString!)
  const id: Components.Schemas.Debriefing["id"] = parseInt(idString!)

  // This is a hack used to make sure Debriefing is not refetched after being deleted and cache cleared
  // TODO: Fix in caching hook?
  const [isDeleted, setIsDeleted] = useState(false)
  const { data: caseData } = useCase(caseId)
  const { data } = useDebriefings(id, { lazy: isDeleted })
  const { handleUpdate, handleDelete } = usePageDebriefing(caseId!, id!)

  const onDelete = () => {
    if (!window.confirm(CONFIRM_TEXT)) return
    setIsDeleted(true)
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
            <Button variant="primaryInverted" iconLeft={ <DeleteOutline /> } onClick={ onDelete }>Terugkoppeling verwijderen</Button>
            <FormTitle>Gebruik dit formulier om terugkoppeling te wijzigen</FormTitle>
            <AddressHeading caseId={ caseId } />
            <DebriefForm caseId={ caseId! } onSubmit={ handleUpdate } initialValues={ data } isLoading={ data === undefined } />
          </>
        }
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default EditPage
