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
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"
import CaseHeading from "app/features/cases/components/CaseHeading/CaseHeading"

type Props = {
  id: string
}

const CompleteCasePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {

  const id = parseUrlParamId(idString)
  const { data, execPost } = useCompleteCase()

  return (
    isValidUrlParamId<Components.Schemas.Case["id"]>(id) ?
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
        <CaseHeading id={ id } />
        <WorkflowForm
          caseId={ id }
          data={ data }
          postMethod={ execPost }
          scaffold={ scaffold }
        />
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CompleteCasePage