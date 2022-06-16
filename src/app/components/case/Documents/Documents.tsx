import { useCaseDocuments } from "app/state/rest"
import DocumentsTable from "./DocumentsTable/DocumentsTable"
import FileUploader from "./FileUploader/FileUploader"


type Props = {
  caseId: Components.Schemas.CaseEvent["id"]
}

const Documents: React.FC<Props> = ({ caseId }) => {
  const [data, { isBusy, execGet }] = useCaseDocuments(caseId)

  return (
    <>
      <FileUploader caseId={ caseId } getDocuments={ execGet } />
      <DocumentsTable
        data={ data?.results }
        caseId={ caseId }
        loading={ isBusy }
        getDocuments={ execGet }
      />
    </>
  )
}

export default Documents
