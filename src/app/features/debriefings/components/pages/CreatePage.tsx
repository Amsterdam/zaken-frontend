import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle, Heading } from "@datapunt/asc-ui"

import { useCase } from "app/state/rest/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DebriefForm from "app/features/debriefings/components/molecules/DebriefForm/DebriefForm"
import AddressHeading from "app/features/debriefings/components/molecules/AddressHeading/AddressHeading"
import usePageDebriefing from "./hooks/usePageDebriefing"

type Props = {
  id: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {
  const id: Components.Schemas.Case["id"] = parseInt(idString!)

  const { data } = useCase(id)
  const { handleCreate } = usePageDebriefing(id)

  return (
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        { data !== undefined &&
          <>
            <Heading as="h2">Nieuwe debrief</Heading>
            <FormTitle>Gebruik dit formulier om terugkoppeling te geven van een debrief</FormTitle>
            <AddressHeading caseId={ id } />
            <DebriefForm caseId={ id! } onSubmit={ handleCreate } />
          </>
        }
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default CreatePage
