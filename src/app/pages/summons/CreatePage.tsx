import React from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import { useSummons } from "app/state/rest/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import AddressHeading from "app/features/shared/components/molecules/AddressHeading/AddressHeading"
import SummonForm from "app/features/summons/components/SummonForm/SummonForm"
import scaffold from "app/features/summons/components/SummonForm/scaffold"
import FormWithExtraLabel from "app/features/shared/components/atoms/FormWithExtraLabel/FormWithExtraLabel"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"
import CaseHeading from "app/features/cases/components/CaseHeading/CaseHeading"

type Props = {
  id: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {
  const id = parseUrlParamId(idString)
  const { data, execPost } = useSummons()

  return (
    isValidUrlParamId<Components.Schemas.Case["id"]>(id) ?
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs />
      </RowWithColumn>
      <RowWithColumn>
        <PageHeading />
      </RowWithColumn>
      <RowWithColumn>
        <FormTitle>Gebruik dit formulier om aan te geven welke aanschrijving(en) opgesteld is en voor wie. Vul dit in nadat brief verstuurd is!</FormTitle>
        <AddressHeading caseId={ id } />
        <CaseHeading id={ id } />
        <FormWithExtraLabel>
          <SummonForm
            caseId={ id! }
            data={ data }
            postMethod={ execPost }
            scaffold= { scaffold }
          />
        </FormWithExtraLabel>
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CreatePage
