import { Button, Spinner } from "@amsterdam/asc-ui"
import { Download } from "@amsterdam/asc-assets"
import useProtectedRequest from "app/state/rest/hooks/useProtectedRequest"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"
import { useState } from "react"

type Props = {
  documentId: number
  size?: number
}

const DownloadDocument: React.FC<Props> = ({ documentId, size = 20 }) => {
  const [loading, setLoading] = useState(false)
  const url = makeApiUrl("documents", documentId, "download")
  const protectedRequest = useProtectedRequest()

  const downloadFile = async () => {
    setLoading(true)
    try {
      const response: any = await protectedRequest<any>("get", url)
      if (response.status === 200) {
        console.log("response", response)
        try {
          // const blob = await response.blob()
          // var binaryData = []
          // binaryData.push(response.data)
          // console.log("binaryData", binaryData)
          // const file = window.URL.createObjectURL(myBlob)
          // console.log("file", file)
          // window.location.assign(response)
          const url = window.URL.createObjectURL(response)
          const link = document.createElement("a")
          link.href = url
          link.setAttribute("download", "test")
          // 3. Append to html page
          document.body.appendChild(link)
          // 4. Force download
          link.click()
          // 5. Clean up and remove the link
          link?.parentNode?.removeChild(link)

        } catch (err) {
          console.log("Blob error", err)
        }

        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  if (!documentId) {
    return null
  }
  return (
    <>
      <Button
        size={ size }
        variant="blank"
        iconSize={ size }
        icon={ loading ? <Spinner /> : <Download /> }
        onClick={ downloadFile }
      />
      <a href="path_to_file" download="proposed_file_name">Download</a>
    </>
  )
}

export default DownloadDocument
