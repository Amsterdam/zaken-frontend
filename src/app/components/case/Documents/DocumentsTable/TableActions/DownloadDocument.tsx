import { Button, Spinner } from "@amsterdam/asc-ui"
import { Download } from "@amsterdam/asc-assets"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"
import { useState } from "react"
import { useAuth } from "react-oidc-context"

type Props = {
  record: any
  size?: number
}

const DownloadDocument: React.FC<Props> = ({ record, size = 20 }) => {
  const [loading, setLoading] = useState(false)
  const apiUrl = makeApiUrl("documents", record.id, "download")
  const auth = useAuth()

  const downloadFile = async () => {
    setLoading(true)
    const token = auth.user?.id_token
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${ token }`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        response.blob()
          .then((blob) => {
            const newBlob = new Blob([blob])
            // Create blob link to download
            const url = window.URL.createObjectURL(newBlob)
            // window.open(url, "_blank_")
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", record.bestandsnaam)
            // Append to html link element page
            document.body.appendChild(link)
            // Start download
            link.click()
            // Clean up and remove the link
            link?.parentNode?.removeChild(link)
          })
      }
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
      iconSize={ size - 2}
      icon={ loading ? <Spinner /> : <Download /> }
      onClick={ downloadFile }
      data-testid="download-document"
    />
  )
}

export default DownloadDocument
