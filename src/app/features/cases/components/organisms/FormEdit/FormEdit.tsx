import React from "react"
import { ScaffoldForm, DebugFormValues } from "amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

// import useGlobalActions from "../../../../../state/state/useGlobalActions"

import scaffoldProps from "./scaffold"

const FormEdit: React.FC = () => 
  // const { cases: { update } } = useGlobalActions()

   (
    <ScaffoldForm onSubmit={ () => {} }>
      <ScaffoldFields {...scaffoldProps} />
      <DebugFormValues />
    </ScaffoldForm>
  )


export default FormEdit
