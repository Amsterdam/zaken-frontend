import { Button, Spinner } from "@amsterdam/asc-ui"
import { Delete } from "app/components/shared/Icons"
import useProtectedRequest from "app/state/rest/hooks/useProtectedRequest"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"
import { useState } from "react"

type Props = {
  documentId: number
  getDocuments: () => Promise<unknown>
  size?: number
}

const DeleteDocument: React.FC<Props> = ({ documentId, getDocuments, size = 20 }) => {
  const [loading, setLoading] = useState(false)
  const url = makeApiUrl("documents", documentId)
  const protectedRequest = useProtectedRequest()

  const downloadFile = async () => {
    setLoading(true)
    try {
      const response: any = await protectedRequest<any>("delete", url)
      if (response.status === 200) {
        setLoading(false)
        getDocuments()
      }
    } catch (error) {
      setLoading(false)
    }
  }

  if (!documentId) {
    return null
  }
  return (
    <Button
      size={ size + 4 }
      variant="blank"
      iconSize={ size + 4 }
      icon={ loading ? <Spinner /> : <Delete /> }
      onClick={ downloadFile }
    />
  )
}

export default DeleteDocument
