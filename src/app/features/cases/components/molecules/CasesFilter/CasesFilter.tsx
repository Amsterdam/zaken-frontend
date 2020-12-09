import React from "react"
import styled from "styled-components"
import { themeColor, themeSpacing } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import scaffold from "./scaffold"

type Props = {
  date: string
  setDate: (value: string) => void
}

const Menu = styled.menu`
  background: ${ themeColor("tint", "level2") };
  margin-top: ${ themeSpacing(8) };
  padding: ${ themeSpacing(4) } ${ themeSpacing(6) };
`

const CasesFilter: React.FC<Props> = ({ date, setDate }) => {
  const onChange = (value: string) => setDate(value)
  return (
    <Menu>
      <ScaffoldForm>
        <ScaffoldFields { ...scaffold(date, onChange) } />
      </ScaffoldForm>
    </Menu>
  )
}
export default CasesFilter
