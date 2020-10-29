import React from "react"

import { useCaseFines } from "app/state/rest"

import InfoHeading from "app/features/shared/components/molecules/InfoHeading/InfoHeading"
import FineSummary from "app/features/cases/components/organisms/FineSummary/FineSummary"
import LoadingDetails from "app/features/shared/components/molecules/Details/LoadingDetails"
import styled from "styled-components"
import { themeSpacing } from "@datapunt/asc-ui"

type Props = {
  id: Components.Schemas.Case["id"]
}

const Wrapper = styled.div`
  margin-bottom: ${ themeSpacing(10) };
`

const Fines: React.FC<Props> = ({ id }) => {
  const { data } = useCaseFines(id)

  return (
    <>
      { data ?
        <>
          <InfoHeading
            infoTitle="Verwerkingstijd"
            infoText="Belastingen pakt overgedragen beschikkingen in principe op binnen 5 werkdagen"
            >
            { data.items.length > 1 ? "Invorderingsbesluiten" : "Invorderingsbesluit" }
          </InfoHeading>
          { data.items.length
            ? data.items.map((fine, index) =>
              <FineSummary
                key={ index }
                id={ fine.identificatienummer }
                state={ fine.invorderingstatus }
                date={ fine.dagtekening }
                hasInvoice={ true }
                />)
            : <Wrapper>Geen</Wrapper>
          }
        </> :
        <LoadingDetails numRows={3} />
      }
    </>
  )
}
export default Fines
