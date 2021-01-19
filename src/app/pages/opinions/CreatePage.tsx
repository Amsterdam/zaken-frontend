import React, { useEffect } from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import { useOpinions, useSummon } from "app/state/rest/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import AddressHeading from "app/features/shared/components/molecules/AddressHeading/AddressHeading"
import WorkflowForm from "app/features/cases/components/Workflow/WorkflowForm"
import scaffold from "app/features/opinion/components/OpinionForm/scaffold"

type Props = {
  id: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {
  const id: Components.Schemas.Case["id"] = parseInt(idString!)
  
  // TODO-MOCKED, get summonId/summonTitle from useCaseEvents(caseId)  
  const summonId: number = 6
  const { data, execGet } = useSummon(summonId, { lazy: true })
  useEffect(() => {
    if (summonId === undefined) return
    execGet() }, [summonId, execGet]
  )

  return (
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <FormTitle>Gebruik dit formulier om aan te geven wat de beoordeling van de zienswijze is</FormTitle>
        <AddressHeading caseId={ id } /> 
        <WorkflowForm
          caseId={ id! } 
          endpoint={ useOpinions } 
          scaffold= { scaffold } 
          extraLabel = { data?.title }
        />
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default CreatePage
