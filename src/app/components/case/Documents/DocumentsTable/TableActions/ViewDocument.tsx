import { useState } from "react"
import { Button, Spinner } from "@amsterdam/asc-ui"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import { Pageview } from "app/components/shared/Icons"

type Props = {
  record: any
  size?: number
}

const ViewDocument: React.FC<Props> = ({ record, size = 20 }) => {
  const [loading, setLoading] = useState(false)
  const apiUrl = makeApiUrl("documents", record.id, "download")
  const keycloak = useKeycloak()

  const downloadFile = async () => {
    setLoading(true)
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${ keycloak.token }`
      }
    })
    .then((response) => response.blob())
    .then((blob) => {
      const newBlob = new Blob([blob], { type: blob.type })
      // Create blob link to download
      const url = window.URL.createObjectURL(newBlob)
      window.open(url, "_blank_")
    })
    .finally(() => {
      setLoading(false)
    })
  }

  if (!record.id) {
    return null
  }
  return (
    <Button
      size={ size }
      variant="blank"
      iconSize={ size + 4 }
      icon={ loading ? <Spinner /> : <Pageview /> }
      onClick={ downloadFile }
      data-e2e-id="download-document"
    />
  )
}

export default ViewDocument
