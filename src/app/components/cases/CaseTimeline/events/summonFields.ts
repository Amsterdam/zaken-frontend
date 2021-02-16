import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"

export default [
  {
    key: "date_added",
    mapValue: (v: string) => displayDate(v),
    shouldShow: (value: any, isNested: boolean) => !isNested
  },
  "author",
  "persons",
  {
    key: "description",
    italic: true
  }
]