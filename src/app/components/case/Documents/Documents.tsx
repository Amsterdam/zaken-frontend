import styled, { css } from "styled-components"
import { themeSpacing, themeColor } from "@amsterdam/asc-ui"

type Props = {
  id?: string
}

type StyleProps = {
  error?: boolean
}

export const inputCss = css<StyleProps>`
  appearance: none;
  font-size: 16px;
  border: solid 1px ${ themeColor("tint", "level5") };
  border-radius: 0;
  box-sizing: border-box;
  line-height: 18px;
  padding: ${ themeSpacing(2) };
  width: 100%;
  height: 44 px;

  ${ ({ error }) =>
    !error &&
    css`
      &:hover {
        border-color: ${ themeColor("tint", "level6") };
      }
    ` }

  ${ ({ error }) =>
    error &&
    css`
      border-color: ${ themeColor("secondary", "main") };
    ` }
`

const InputStyle = styled.input.attrs({ type: "file" })<StyleProps>`
  ${ inputCss }
`

const Documents: React.FC<Props> = ({ id }) => {
  console.log("Test")
  return (
    <>
      <label htmlFor="avatar">Choose a profile picture:</label>

      <InputStyle
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
      />


    </>
  )
}

export default Documents
