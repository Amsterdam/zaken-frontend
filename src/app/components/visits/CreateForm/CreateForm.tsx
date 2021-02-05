import React from "react"
import { FormTitle } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/components/shared/components/molecules/Form/ScaffoldFields"
import createScaffoldProps from "./scaffold"
import { useAuthors, useVisitsCreate } from "app/state/rest"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import navigateTo from "app/routing/navigateTo"

type Props = {
  caseId: Components.Schemas.Case["id"]
  initialValues?: Partial<Components.Schemas.Visit>
  isLoading?: boolean
}

export type VisitData = Omit<Components.Schemas.Visit, "author_ids"> & { author1: string, author2: string }

const mapData = (data: VisitData) => ({ ...data, author_ids: [data.author1, data.author2] })


const VisitForm: React.FC<Props> = ({ caseId, isLoading }) => {
  const { data } = useAuthors()
  const authors = data?.results ?? []

  const { execPost } = useVisitsCreate()
  const { addSuccessFlashMessage } = useFlashMessages()

  const onSubmit = async (data: VisitData) => {
    await execPost(mapData(data))
    const path = `/zaken/${ data.case }`
    addSuccessFlashMessage(path, "Succes", "Het resultaat huisbezoek is succesvol verwerkt")
    navigateTo(path)
  }
  return (
    <>
      <FormTitle>Gebruik dit formulier om een huisbezoek aan te maken</FormTitle>
      <ScaffoldForm
        showSpinner={ isLoading }
        onSubmit={ onSubmit }
        initialValues={ { case: caseId, start_time: "2021-01-01T12:34", observations: [] } }
      >

        <ScaffoldFields {...createScaffoldProps(caseId, authors) } />
      </ScaffoldForm>
    </>
  )
}

export default VisitForm
