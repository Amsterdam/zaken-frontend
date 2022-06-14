import { useState } from "react"
import { Select, themeSpacing, Spinner, Button } from "@amsterdam/asc-ui"
import styled from "styled-components"
import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import { useDocumentTypesByCase } from "app/state/rest"

type Props = {
  caseId: Components.Schemas.CaseDetail["id"]
  isOpen: boolean
  onClose: () => void
  onSubmit: (documentUrl: string) => void
  loading: boolean
}

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: ${ themeSpacing(6) };
`

const DEFAULT_VALUE: string = "1"

const DocumentTypeModal: React.FC<Props> = ({ caseId, isOpen, onClose, onSubmit, loading }) => {
  const [documentType, setDocumentType] = useState(DEFAULT_VALUE)
  const [documentTypes, { isBusy }] = useDocumentTypesByCase(caseId)

  const showSpinner = isBusy || documentTypes === undefined

  const onCancel = () => {
    setDocumentType(DEFAULT_VALUE)
    onClose()
  }

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
              { documentTypes.map((type) => (
                <option value={ type.url } key={ type.url } >{ type.omschrijving }</option>
              ))}
            </Select>
          </>
        )}
        <ButtonContainer>
          <Button onClick={ onCancel } variant="primaryInverted">
            Annuleer
          </Button>
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
