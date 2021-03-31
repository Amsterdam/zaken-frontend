import { displayDate } from "@amsterdam/wonen-ui"

export default [
  {
    key: "date_added",
    mapValue: (v: string) => displayDate(v)
  },
  "author"
]