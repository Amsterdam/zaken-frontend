import { useCaseDocuments, useDocumentTypesByCase } from "app/state/rest"
import { useEffect } from "react"
import DocumentsTable from "./DocumentsTable/DocumentsTable"
import FileUploader from "./FileUploader/FileUploader"

type Props = {
  caseId: Components.Schemas.CaseEvent["id"]
  isActiveTab?: boolean
}

const Documents: React.FC<Props> = ({ caseId, isActiveTab }) => {
  const [data, { isBusy, execGet: getDocuments }] = useCaseDocuments(caseId, { lazy: true })
  const [documentTypes, { execGet: getDocumentTypes }] = useDocumentTypesByCase(caseId, { lazy: true })

  // Fetch the documents when user clicks on the documents tab.
  useEffect(() => {
    if (isActiveTab != null) {
      void getDocuments()
      void getDocumentTypes()
    }
  }, [isActiveTab, getDocuments, getDocumentTypes])

  return (
    <>
      <FileUploader
        caseId={ caseId }
        getDocuments={ getDocuments }
        documentTypes={ documentTypes }
      />
      <DocumentsTable
        documents={ data?.results }
        caseId={ caseId }
        loading={ isBusy }
        getDocuments={ getDocuments }
        documentTypes={ documentTypes }
      />
    </>
  )
}

export default Documents
