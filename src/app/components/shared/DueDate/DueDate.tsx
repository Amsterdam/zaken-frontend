import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"
import { isDateInPast } from "../Date/helpers"
import { DateDisplay } from "@amsterdam/wonen-ui"

type Props = {
  date: Components.Schemas.CamundaTask["due_date"]
}

const PastDateDisplay = styled(DateDisplay)`
  color: ${ themeColor("secondary") };
`

const DueDate: React.FC<Props> = ({ date }) =>
  isDateInPast(new Date(date)) ?
    <PastDateDisplay date={ date } /> :
    <DateDisplay date={ date } />

export default DueDate