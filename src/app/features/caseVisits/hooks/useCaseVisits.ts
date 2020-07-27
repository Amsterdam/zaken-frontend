export type CaseVisit = {
  id: number
  case_id: string
  address: string
  employees: string[]
  date: Date
  note0: string
  note1: string
  checks: { label: string, checked: boolean }[]
  published: boolean
}
const caseVisits: CaseVisit[] = [
  {
    id: 8,
    case_id: "999",
    address: "Alfastraat 12b",
    employees: ["Anne Aa", "Benne Bb", "Carlo Cc"],
    date: new Date(),
    note0: "Lorem",
    note1: "Ipsum",
    checks: [
      {
        label: "A",
        checked: false
      }
    ],
    published: true
  },
  {
    id: 9,
    case_id: "999",
    address: "Alfastraat 12b",
    employees: ["Danny Dd", "Eve Ee", "Frans Ff"],
    date: new Date(),
    note0: "Lorem 2",
    note1: "Ipsum two",
    checks: [
      {
        label: "B",
        checked: false
      }
    ],
    published: false
  }
]
export default (): CaseVisit[] => caseVisits
export const useCaseVisit = (id: string): CaseVisit => caseVisits[0]
