import styled, { css } from "styled-components"
import { themeSpacing, themeColor } from "@amsterdam/asc-ui"
import FileUploader from "./FileUploader"


type Props = {
  caseId: Components.Schemas.CaseEvent["id"]
}

const Documents: React.FC<Props> = ({ caseId }) => {
  console.log("DOCUMENTS")

  return (
    <>
      <FileUploader caseId={ caseId }/>
    </>
  )
}

export default Documents
