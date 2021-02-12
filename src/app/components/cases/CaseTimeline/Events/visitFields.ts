import { displayTime } from "app/components/shared/DateDisplay/DateDisplay"
import { visitEventValuesMap, visit_go_ahead } from "../helpers/dictionaries"

export default [
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