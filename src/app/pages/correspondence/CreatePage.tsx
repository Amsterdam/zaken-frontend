import React from "react"
import styled from "styled-components"
import { RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import AddressHeading from "app/features/shared/components/molecules/AddressHeading/AddressHeading"
import WorkflowForm from "app/features/cases/components/Workflow/WorkflowForm"
import { useCorrespondence } from "app/state/rest"
import scaffold from "app/features/correspondence/components/CorrespondenceForm/scaffold"

type Props = {
  id: string
}

const FormWithTooltip = styled.div`
form > div > div > div > div {
  flex-grow: 0;
  align-self: center;
  white-space: nowrap;
}
`

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {
  const id: Components.Schemas.Case["id"] = parseInt(idString!)
  const correspondence = useCorrespondence()
  const { execPost } = correspondence

  return (
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <FormTitle>Gebruik dit formulier om notitie van correspondentie toe te voegen</FormTitle>
        <AddressHeading caseId={ id } />
        <FormWithTooltip>
          <WorkflowForm
            caseId={ id! } 
            endpoint={ correspondence }
            postMethod = { execPost }
            scaffold= { scaffold }
          />
        </FormWithTooltip>  
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default CreatePage
