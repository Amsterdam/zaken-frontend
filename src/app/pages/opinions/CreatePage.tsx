import React, { useEffect } from "react"
import { RouteComponentProps } from "@reach/router"
import { FormTitle } from "@amsterdam/asc-ui"

import { useCase, useSummon } from "app/state/rest/"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import PageHeading from "app/features/shared/components/molecules/PageHeading/PageHeading"
import BreadCrumbs from "app/features/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import OpinionForm from "app/features/opinion/components/OpinionForm/OpinionForm"
import AddressHeading from "app/features/shared/components/molecules/AddressHeading/AddressHeading"

type Props = {
  id: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {
  const id: Components.Schemas.Case["id"] = parseInt(idString!)
  const caseData = useCase(id).data

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
        { caseData !== undefined &&
          <>
            <FormTitle>Gebruik dit formulier om aan te geven wat de beoordeling van de zienswijze is</FormTitle>
            <AddressHeading caseId={ id } />
            <OpinionForm caseId={ id! } summonTitle={data?.title}  />
          </>
        }
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default CreatePage
