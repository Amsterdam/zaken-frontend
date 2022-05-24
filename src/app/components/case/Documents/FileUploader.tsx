import React, { useState } from "react"
import styled from "styled-components"
import { themeColor, themeSpacing, Icon, Spinner } from "@amsterdam/asc-ui"
import { CloudUpload } from "app/components/shared/Icons"
import useProtectedRequest from "app/state/rest/hooks/useProtectedRequest"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"

type Props = {
  caseId: Components.Schemas.CaseEvent["id"]
  getDocuments: () => Promise<unknown>
}

const StyledDiv =  styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${ themeSpacing(6) };
`

const StyledSpan =  styled.span`
  margin-bottom: ${ themeSpacing(4) };
`

const StyledLabel = styled.label`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ themeColor("tint", "level3") };
  padding: ${ themeSpacing(8) };
  color: ${ themeColor("primary") };
  cursor: pointer;
  &:hover {
    background-color: ${ themeColor("tint", "level4") };
    transition: background-color 0.3s ease;
  }
`

const StyledIconSpan = styled.span`
  margin-left: ${ themeSpacing(3) };
`

const Input = styled.input.attrs({ type: "file" })`
  display: none;
`

const StyledSelectedFile =  styled.span`
  margin-top: ${ themeSpacing(3) };
`

const FileUploader: React.FC<Props> = ({ caseId, getDocuments }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const url = makeApiUrl("cases", caseId, "documents", "create")
  const protectedRequest = useProtectedRequest()

  const uploadFile = async (event: any) => {
    const fileUploaded = event.target.files[0]
    const formData = new FormData()
		formData.append("file", fileUploaded)
    formData.append("documenttype_url", "https://acc.api.wonen.zaken.amsterdam.nl/open-zaak/catalogi/api/v1/informatieobjecttypen/655ed6b3-2ee8-475d-8e40-7de76a2454f7")

    setLoading(true)
    setError(false)
    try {
      const response: any = await protectedRequest<any>("post", url, formData)
      if (response.status === 200) {
        setSelectedFile(fileUploaded)
        setLoading(false)
        getDocuments()
      }
    } catch (error) {
      setSelectedFile(null)
      setLoading(false)
      setError(true)
    }
  }

  const onInputClick = (event: any) => {
    // Empty the value so user can uploud same file again.
    event.target.value = ""
  }

  return (
    <StyledDiv>
      <StyledSpan>
        Voeg documenten toe
      </StyledSpan>
      <StyledLabel htmlFor="file-upload">
        Klik hier en selecteer een bestand om te uploaden
        <StyledIconSpan>
          { loading ? <Spinner size={28} color={ themeColor("primary") }/> : (
            <Icon size={28}><CloudUpload /></Icon>
          )}
        </StyledIconSpan>
      </StyledLabel>
      <Input
        id="file-upload"
        data-e2e-id="file-upload"
        type="file"
        onChange={ uploadFile }
        accept="*/*"
        onClick={ onInputClick }
      />
      <StyledSelectedFile>
        {selectedFile && `${ selectedFile?.name } is succesvol geüpload.`}
        {error && "Oeps, er ging iets mis."}
      </StyledSelectedFile>
    </StyledDiv>
  )
}

export default FileUploader
