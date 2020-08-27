import React, { useMemo } from "react"
import styled from "styled-components"
import Details from "../../../../shared/components/molecules/Details/Details"
import CircleIcon from "app/features/shared/components/atoms/CircleIcon/CircleIcon"
import DateDisplay from "app/features/shared/components/atoms/DateDisplay/DateDisplay"

type Props = {
  id: number
  date: string
  state: string
  hasInvoice?: boolean
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const FineSummary: React.FC<Props> = ({ id, date, state, hasInvoice = false }) => {
  const values = useMemo(() => ({
    "Kenmerk": id,
    "Status": <Wrap>
      { state }
      { hasInvoice ?
        <CircleIcon color="#00A03C" icon={ "Checkmark" } /> :
        <CircleIcon color="#009DEC" icon={ "Ellipsis" } />
      }
    </Wrap>,
    "Datum": <DateDisplay date={ date } />
  }), [ id, state, date, hasInvoice ])

  return <Details
    numInitialVisibleRows={3}
    values={values}
  />
}

export default FineSummary
