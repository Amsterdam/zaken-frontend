import React from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"

import { scaffoldProps } from "./scaffold"

const mockHandleSubmit = (...args: any[]) => new Promise(resolve => {
  console.log("Mock submit...", args)
  // Resolve promise after a timeout.
  setTimeout(() => {
    console.log("...submitted!")
    resolve()
  }, 1000)
})

const POCForm: React.FC = () => (
  <ScaffoldForm
    scaffoldProps={scaffoldProps}
    onSubmit={mockHandleSubmit}
  />
)


export default POCForm
