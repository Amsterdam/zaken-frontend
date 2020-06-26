import React from "react"
import { ScaffoldForm, Scaffold, DebugFormValues } from "amsterdam-react-final-form"

// import useGlobalActions from "../../../../../state/state/useGlobalActions"

import scaffoldProps from "./scaffold"

const FormEdit: React.FC = () => 
  // const { cases: { update } } = useGlobalActions()

   (
    <ScaffoldForm onSubmit={ () => {} }>
      <Scaffold {...scaffoldProps} />
      <DebugFormValues />
    </ScaffoldForm>
  )


export default FormEdit
