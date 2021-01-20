import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import { useCompleteCase } from "app/state/rest/"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import Breadcrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import WorkflowForm from "app/features/cases/components/Workflow/WorkflowForm"
import AddressHeading from "app/features/shared/components/molecules/AddressHeading/AddressHeading"
import scaffold from "app/features/cases/components/CompleteForm/scaffold"

type Props = {
  id: string
}

const CompleteCasePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {

  const id: Components.Schemas.Case["id"] = parseInt(idString!)
  const endpoint = useCompleteCase()
  const { execPost } = endpoint

  return (
    <DefaultLayout>
      <RowWithColumn>
        <Breadcrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <FormTitle>Gebruik dit formulier om de zaak af te ronden</FormTitle>
        <AddressHeading caseId={ id } />
        <WorkflowForm
          caseId={ id }
          endpoint={ endpoint }
          postMethod = { execPost }
          scaffold= { scaffold }
        />
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default CompleteCasePage