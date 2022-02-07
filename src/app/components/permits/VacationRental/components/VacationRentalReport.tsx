import styled  from "styled-components"
import { DefinitionList } from "@amsterdam/wonen-ui"
import { themeSpacing } from "@amsterdam/asc-ui"

import Report from "./Report"
import useVacationRentalValues from "./hooks/useVacationRentalValues"

type Props = {
  vakantieverhuurReport: Components.Schemas.VakantieverhuurReportInformation
  title: string
}

const StyledDiv = styled.div`
  margin-bottom: ${ themeSpacing(12) };
`

const VacationRentalReport: React.FC<Props> = ({ vakantieverhuurReport, title }) => {
  const values = useVacationRentalValues(vakantieverhuurReport)
  const { reports } = vakantieverhuurReport

  return (
    <StyledDiv>
      <DefinitionList
        title={ `${ title } ${ vakantieverhuurReport.year }` }
        data={ values }
        headingSize="h4"
      />
      { reports.map(({ check_in_date, check_out_date, is_cancellation }, index: number) =>
          <Report
            key={ index }
            checkInDate={ check_in_date }
            checkOutDate={ check_out_date }
            isCancellation={ is_cancellation }
          />
      ) }
    </StyledDiv>
  )
}

export default VacationRentalReport
