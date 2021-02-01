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
import FormWithExtraLabel from "app/features/shared/components/atoms/FormWithExtraLabel/FormWithExtraLabel"
import parseUrlParamId from "app/routing/utils/parseUrlParamId"
import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"

type Props = {
  id: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {
  const id = parseUrlParamId(idString)

  const { data, execPost } = useOpinions()

  // TODO-MOCKED, get summonId/summonTitle from useCaseEvents(caseId)
  const summonId = 6
  const { data: summonData, execGet } = useSummon(summonId, { lazy: true })
  useEffect(() => {
      if (summonId === undefined) return
      execGet()
    },
    [summonId, execGet]
  )

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
        <FormTitle>Gebruik dit formulier om aan te geven wat de beoordeling van de zienswijze is</FormTitle>
        <AddressHeading caseId={ id } />
        <FormWithExtraLabel>
          <WorkflowForm
            caseId={ id! }
            data={ data }
            postMethod={ execPost }
            scaffold= { scaffold }
            extraLabel = { summonData?.title }
          />
        </FormWithExtraLabel>
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
  )
}

export default CreatePage
