import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import AddressHeading from "app/features/shared/components/molecules/AddressHeading/AddressHeading"
import VisitForm from "app/features/visits/components/CreateForm/CreateForm"
// import WorkflowForm from "app/features/cases/components/Workflow/WorkflowForm"
// import scaffold from "app/features/summons/components/SummonForm/scaffold"
// import FormWithExtraLabel from "app/features/shared/components/atoms/FormWithExtraLabel/FormWithExtraLabel"

type Props = {
  id: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {
  const id: Components.Schemas.Case["id"] = parseInt(idString!)
//   const visits = useVisits()
//   const { execPost } = visits


console.log("id", id)

  return (
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
        <VisitForm caseId={id!} />
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default CreatePage
