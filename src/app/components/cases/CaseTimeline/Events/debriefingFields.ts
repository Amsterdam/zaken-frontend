import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"

export default [
  {
    key: "date_added",
    mapValue: (v: string) => displayDate(v)
  },
  "author",
  "violation",
  {
    key: "feedback",
    italic: true
  }
]