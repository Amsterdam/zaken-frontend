import React from "react"
import { ScaffoldForm, Scaffold, DebugFormValues } from "amsterdam-react-final-form"

import { useGlobalActions } from "app/state/state/globalState"

import scaffoldProps from "./scaffold"

const POCForm: React.FC = () => {
  const { cases: { create } } = useGlobalActions()

  return (
    <ScaffoldForm onSubmit={ create }>
      <Scaffold {...scaffoldProps} />
      <DebugFormValues />
    </ScaffoldForm>
  )
}


export default POCForm
