import React from "react"
import styled from "styled-components"

type Props = {
  handleFile: (fileUploaded: any) => void
}

const Button = styled.button`
  /* Insert your favorite CSS code to style a button */
`

const FileUploader: React.FC<Props> = ({ handleFile }) => {
  const hiddenFileInput = React.useRef(null)

  const handleClick = (event: any) => {
    hiddenFileInput.current.click()
  }

  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0]
    handleFile(fileUploaded)
  }

  return (
    <>
      <Button onClick={handleClick}>
        Upload a file
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display:"none" }}
      />
    </>
  )
}
export default FileUploader