import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"

export default [
  {
    key: "start_date",
    mapValue: (v: string) => displayDate(v)
  },
  "author",
  "reason",
  {
    key: "description",
    italic: true
  }
]