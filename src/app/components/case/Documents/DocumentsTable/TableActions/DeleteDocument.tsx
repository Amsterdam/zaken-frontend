import { Button, Paragraph, Spinner } from "@amsterdam/asc-ui"
import { Delete } from "app/components/shared/Icons"
import useProtectedRequest from "app/state/rest/hooks/useProtectedRequest"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"
import { useState } from "react"
import ConfirmModal from "app/components/shared/Modal/ConfirmModal"

type Props = {
  record: any
  getDocuments: () => Promise<unknown>
  size?: number
}

const DeleteDocument: React.FC<Props> = ({ record, getDocuments, size = 20 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const url = makeApiUrl("documents", record.id)
  const protectedRequest = useProtectedRequest()

  const deleteFile = async () => {
    setLoading(true)
    try {
      const response: any = await protectedRequest<any>("delete", url)
      if (response.status === 204) {
        setLoading(false)
        getDocuments()
      }
    } catch (error) {
      setLoading(false)
    }
  }

  if (!record.id) {
    return null
  }
  return (
    <>
      <Button
        size={ size + 4 }
        variant="blank"
        iconSize={ size + 4 }
        icon={ loading ? <Spinner /> : <Delete /> }
        onClick={ () => setIsOpen(true) }
        data-e2e-id="delete-document"
      />
      <ConfirmModal
        title="Document verwijderen"
        isOpen={ isOpen }
        onConfirm={ deleteFile }
        onClose={ () => setIsOpen(false) }
        okValue="Verwijderen"
      >
        <Paragraph>
          Weet je zeker dat je <strong>{ record?.bestandsnaam }</strong> wil verwijderen?
        </Paragraph>
      </ConfirmModal>
    </>
  )
}

export default DeleteDocument
