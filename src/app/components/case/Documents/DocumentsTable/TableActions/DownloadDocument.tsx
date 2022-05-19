import { Button } from "@amsterdam/asc-ui"
import { Download } from "@amsterdam/asc-assets"

type Props = {
  size?: number
}

const DownloadDocument: React.FC<Props> = ({ size = 20 }) => {
  console.log("DOWNLOAD")
  return (
    <Button size={ size } variant="blank" iconSize={ size } icon={<Download />} />
  )
}

export default DownloadDocument
