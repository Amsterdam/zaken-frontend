import React from "react"

import { useCaseFines } from "app/state/rest"

import InfoHeading from "app/features/shared/components/molecules/InfoHeading/InfoHeading"
import FineSummary from "app/features/cases/components/organisms/FineSummary/FineSummary"
import LoadingDetails from "app/features/shared/components/molecules/Details/LoadingDetails"
import styled from "styled-components"
import { themeSpacing } from "@datapunt/asc-ui"

type Props = {
  id: NonNullable<Components.Schemas.Case["identification"]>
}

const Wrapper = styled.div`
  margin-bottom: ${ themeSpacing(10) };
`

const Fines: React.FC<Props> = ({ id }) => {
  const { data: finesData } = useCaseFines(id)

  return (
    <>
      { finesData ?
        <>
          <InfoHeading
            infoTitle="Verwerkingstijd"
            infoText="Belastingen pakt overgedragen beschikkingen in principe op binnen 5 werkdagen"
            >
            { finesData.states_with_fines.length > 1 ? "Invorderingsbesluiten" : "Invorderingsbesluit" }
          </InfoHeading>
          { finesData.states_with_fines.length
            ? finesData.states_with_fines.map((fine: any, index: number) =>
              <FineSummary
                key={ index }
                id={ fine.invoice_identification }
                state={fine.state_type.name}
                date={ fine.start_date }
                hasInvoice={ fine.fines.length > 0 }
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
