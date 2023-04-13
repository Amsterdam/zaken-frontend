import { useState } from "react"
import { Select, Spinner, Button } from "@amsterdam/asc-ui"
import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import { ButtonContainer, StyledButton } from "../../CaseDetails/layout"

type Props = {
  caseId: Components.Schemas.CaseDetail["id"]
  isOpen: boolean
  onClose: () => void
  onSubmit: (documentUrl: string) => void
  loading: boolean
  documentTypes?: Components.Schemas.DocumentType[]
}

const DEFAULT_VALUE = "1"

const DocumentTypeModal: React.FC<Props> = ({ caseId, isOpen, onClose, onSubmit, loading, documentTypes }) => {
  const [documentType, setDocumentType] = useState(DEFAULT_VALUE)
  const showSpinner = documentTypes === undefined

  const onCancel = () => {
    setDocumentType(DEFAULT_VALUE)
    onClose()
  }

  const sortedDocumentTypes = documentTypes ? documentTypes.sort((a, b) => a.omschrijving.localeCompare(b.omschrijving)) : []

  return (
    <Modal isOpen={ isOpen } onClose={ onCancel } title="Kies een documenttype">
      <ModalBlock>
        { showSpinner ? <Spinner /> : (
          <>
            <Select
              id="select-document-type"
              onChange={ (event: React.ChangeEvent<HTMLSelectElement>) => setDocumentType(event.target.value) }
            >
              <option value={ DEFAULT_VALUE }>Maak een keuze</option>
              { sortedDocumentTypes.map((type) => (
                <option value={ type.url } key={ type.url } >{ type.omschrijving }</option>
              ))}
            </Select>
          </>
        )}
        <ButtonContainer>
          <StyledButton
            onClick={ onCancel }
            variant="primaryInverted"
            disabled={ loading }
          >
            Annuleer
          </StyledButton>
          <Button
            onClick={() => onSubmit(documentType) }
            variant="primary"
            disabled={ documentType === DEFAULT_VALUE || loading }
            iconLeft={ loading ? <Spinner /> : null }
          >
            Opslaan
          </Button>
        </ButtonContainer>
      </ModalBlock>
    </Modal>
  )
}

export default DocumentTypeModal
