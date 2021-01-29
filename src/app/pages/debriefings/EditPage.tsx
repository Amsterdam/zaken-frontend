import React, { useState } from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle, Heading, Button } from "@amsterdam/asc-ui"
import { Delete } from "app/features/shared/components/atoms/Icons"

import { useCase, useDebriefings } from "app/state/rest/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import AddressHeading from "app/features/shared/components/molecules/AddressHeading/AddressHeading"
import DebriefForm from "app/features/debriefings/components/DebriefForm/DebriefForm"
import usePageDebriefing from "./hooks/usePageDebriefing"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamCaseId from "app/routing/utils/isValidUrlParamCaseId"
import isValidUrlParamDebriefingId from "app/routing/utils/isValidUrlParamDebriefingId"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"

type Props = {
  id: string
  debriefingId: string
}

const CONFIRM_TEXT = "Weet je zeker dat je deze debriefing wilt verwijderen?"

const EditPage: React.FC<RouteComponentProps<Props>> = ({ id: idString, debriefingId: debriefingIdString }) => {

  const id = parseUrlParamId(idString)
  const debriefingId = parseUrlParamId(debriefingIdString)

  // This is a hack used to make sure Debriefing is not refetched after being deleted and cache cleared
  // TODO: Fix in caching hook?
  const [isDeleted, setIsDeleted] = useState(false)
  const { data: caseData } = useCase(id)
  const { data } = useDebriefings(id, { lazy: isDeleted })
  const { handleUpdate, handleDelete } = usePageDebriefing(id!, debriefingId!)

  const onDelete = () => {
    if (!window.confirm(CONFIRM_TEXT)) return
    setIsDeleted(true)
    handleDelete()
  }

  const showForm = caseData !== undefined && data !== undefined

  return (
    isValidUrlParamCaseId(id) && isValidUrlParamDebriefingId(debriefingId) ?
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
            <Button variant="primaryInverted" iconLeft={ <Delete /> } onClick={ onDelete }>Terugkoppeling verwijderen</Button>
            <FormTitle>Gebruik dit formulier om terugkoppeling te wijzigen</FormTitle>
            <AddressHeading caseId={ id } />
            <DebriefForm caseId={ id } onSubmit={ handleUpdate } initialValues={ data } isLoading={ data === undefined } />
          </>
        }
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default EditPage
