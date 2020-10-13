import React from "react"
import styled from "styled-components"
import { themeColor, themeSpacing } from "@datapunt/asc-ui"
import { ScaffoldForm } from "amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import scaffoldProps from "./scaffold"

const Menu = styled.menu`
  background: ${ themeColor("tint", "level2") };
  margin-top: ${ themeSpacing(8) };
  padding: ${ themeSpacing(4) } ${ themeSpacing(6) };
`

const CasesFilter: React.FC = () => (
    <Menu>
      <ScaffoldForm>
        <ScaffoldFields { ...scaffoldProps } />
      </ScaffoldForm>
    </Menu>
  )
export default CasesFilter
