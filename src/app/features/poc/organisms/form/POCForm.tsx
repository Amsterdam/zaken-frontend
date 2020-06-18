import React from "react"
import { ScaffoldForm, Scaffold, DebugFormValues } from "amsterdam-react-final-form"

import useGlobalActions from "../../globalstate/useGlobalActions"

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
