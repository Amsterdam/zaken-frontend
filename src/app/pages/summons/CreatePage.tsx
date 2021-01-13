import React from "react"
import styled from "styled-components"
import { RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import { useCase } from "app/state/rest/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import AddressHeading from "app/features/shared/components/molecules/AddressHeading/AddressHeading"
import SummonForm from "app/features/summons/components/SummonForm/SummonForm"

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
  const { data } = useCase(id)

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
            <FormTitle>Gebruik dit formulier om aan te geven welke aanschrijving opgesteld is</FormTitle>
            <AddressHeading caseId={ id } />
            <FormWithTooltip>
              <SummonForm caseId={ id! } />
            </FormWithTooltip>
          </>
        }
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default CreatePage
