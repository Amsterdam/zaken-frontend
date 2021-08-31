import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"
import { DateDisplay } from "@amsterdam/wonen-ui"
import isDateInPast from "../Date/isDateInPast"

type Props = {
  date: Components.Schemas.CamundaTask["due_date"]
  emptyText?: string
}

const PastDateDisplay = styled(DateDisplay)`
  color: ${ themeColor("secondary") };
`

const DueDate: React.FC<Props> = ({ date, emptyText }) => 
  date !== null
  ? isDateInPast(new Date(date)) 
    ? <PastDateDisplay date={ date } emptyText={ emptyText }/>
    : <DateDisplay date={ date } emptyText={ emptyText } />
  : <span>{ emptyText }</span>
export default DueDate