const noop = () => {}

export type StateType = {
  cases: {
    districtNames: components["schemas"]["District"]["name"][]
    fromStartDate: string
    housingCorporations: string[]
    housingCorporationIsNull: boolean
    openCases: string
    pagination: TABLE.Schemas.Pagination
    projects: string[]
    reason: string
    sorting: TABLE.Schemas.Sorting
    addressSearch: string
    subjects: string[]
    tags: string[]
    theme: string
    updateContextCases: (payload: any) => void
  }
  tasks: {
    districtNames: components["schemas"]["District"]["name"][]
    housingCorporations: string[]
    housingCorporationIsNull: boolean
    owners: string[]
    pagination: TABLE.Schemas.Pagination
    projects: string[]
    reason: string
    role?: string
    sorting: TABLE.Schemas.Sorting
    theme: string
    subjects: string[]
    tags: string[]
    taskNames: components["schemas"]["CaseUserTaskTaskName"]["name"][]
    updateContextTasks: (payload: any) => void
  }
}

// Initial State
export const initialState: StateType = {
  cases: {
    districtNames: [],
    fromStartDate: "",
    housingCorporations: [],
    housingCorporationIsNull: false,
    openCases: "open",
    pagination: {
      page: 1,
      pageSize: 25,
    },
    projects: [],
    reason: "",
    sorting: {
      dataIndex: "start_date",
      order: "DESCEND",
    },
    addressSearch: "",
    subjects: [],
    tags: [],
    theme: "",
    updateContextCases: noop,
  },
  tasks: {
    districtNames: [],
    housingCorporations: [],
    housingCorporationIsNull: false,
    owners: [],
    pagination: {
      page: 1,
      pageSize: 25,
    },
    projects: [],
    reason: "",
    role: undefined,
    sorting: {
      dataIndex: "due_date",
      order: "ASCEND",
    },
    subjects: [],
    tags: [],
    taskNames: [],
    theme: "",
    updateContextTasks: noop,
  },
}

export default initialState
