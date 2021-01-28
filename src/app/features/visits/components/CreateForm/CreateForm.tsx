import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import createScaffoldProps from "./scaffold"
import { useAuthors } from "app/state/rest"
import { VisitData } from "app/pages/visits/CreatePage"

type Props = {
  caseId: Components.Schemas.Case["id"]
  initialValues?: Partial<Components.Schemas.Visit>
  onSubmit: (data: VisitData) => Promise<void>
  isLoading?: boolean
}

const VisitForm: React.FC<Props> = ({ caseId, isLoading, onSubmit }) => {
  const { data } = useAuthors()
  const authors = data?.results ?? []
  return (
    
    <ScaffoldForm
    showSpinner={ isLoading }
    onSubmit={ onSubmit }
    initialValues={ { case: caseId, start_time: "2021-01-01T12:34" } }
  >
    
    <ScaffoldFields {...createScaffoldProps(caseId, authors) } />
  </ScaffoldForm>  

  )
}
  
export default VisitForm
