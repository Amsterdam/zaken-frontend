import React from "react"
import { ScaffoldForm, Scaffold, DebugFormValues } from "amsterdam-react-final-form"

import useGlobalActions from "../../globalstate/useGlobalActions"

import scaffoldProps from "./scaffold"

const mockHandleSubmit = (...args: any[]) => new Promise(resolve => {
  console.log("Mock submit...", args)
  // Resolve promise after a timeout.
  setTimeout(() => {
    console.log("...submitted!")
    resolve()
  }, 1000)
})

const POCForm: React.FC = () => {
  const { cases: { create } } = useGlobalActions()

  return (
    <ScaffoldForm onSubmit={ (values: API.Case) => create(values) }>
      <Scaffold {...scaffoldProps} />
      <DebugFormValues />
    </ScaffoldForm>
  )
}


export default POCForm
