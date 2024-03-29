import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"
import { DateDisplay } from "@amsterdam/wonen-ui"
import isDateInPast from "../Date/isDateInPast"

type Props = {
  date: Components.Schemas.CaseUserTaskWorkdflow["due_date"] | undefined
  emptyText?: string
}

const PastDateDisplay = styled(DateDisplay)`
  color: ${ themeColor("secondary") };
`

const DueDate: React.FC<Props> = ({ date, emptyText }) =>
  date !== undefined && isDateInPast(new Date(date))
    ? <PastDateDisplay date={ date } />
    : <DateDisplay date={ date } emptyText={ emptyText } />

export default DueDate