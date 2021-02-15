import { displayDate, displayTime } from "app/components/shared/DateDisplay/DateDisplay"
import { visitLabelsMap, visitEventValuesMap, visit_go_ahead } from "../helpers/dictionaries"

export default [
  {
    key: "start_time",
    label: visitLabelsMap["date"],
    mapValue: (v: string) => displayDate(v),
    shouldShow: (value: any, isNested: boolean) => !isNested
  },
  {
    key: "start_time",
    mapValue: (v: string) => displayTime(v, true)
  },
  "authors",
  {
    key: "situation",
    mapValue: (v: keyof typeof visitEventValuesMap) => visitEventValuesMap[v]
  },
  {
    key: "notes",
    italic: true
  },
  {
    key: "observations",
    mapValue: (v: keyof typeof visitEventValuesMap) => visitEventValuesMap[v]
  },
  {
    key: "suggest_next_visit",
    mapValue: (v: keyof typeof visitEventValuesMap) => visitEventValuesMap[v]
  },
  {
    key: "suggest_next_visit_description",
    italic: true
  },
  {
    key: "can_next_visit_go_ahead",
    mapValue: (v: keyof typeof visit_go_ahead) => visit_go_ahead[v]
  },
  {
    key: "can_next_visit_go_ahead_description",
    italic: true
  }
]