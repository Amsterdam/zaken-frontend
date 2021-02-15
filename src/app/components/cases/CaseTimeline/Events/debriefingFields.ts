import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"
import { debriefViolationMap } from "../helpers/dictionaries"

export default [
  {
    key: "date_added",
    mapValue: (v: string) => displayDate(v)
  },
  "author",
  {
    key: "violation",
    mapValue: (v: string) => debriefViolationMap[v]
  },
  {
    key: "feedback",
    italic: true
  }
]