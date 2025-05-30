const noop = () => {}

export type StateType = {
  cases: {
    count: number
    districtNames: Components.Schemas.District["name"][]
    fromStartDate: string
    housingCorporations: string[]
    pagination: TABLE.Schemas.Pagination
    projects: string[]
    reason: string
    results: Components.Schemas.Case[]
    sorting: TABLE.Schemas.Sorting
    streetName: string
    subjects: string[]
    tags: string[]
    theme: string
    updateContextCases: (payload: any) => void
  }
  tasks: {
    count: number
    districtNames: Components.Schemas.District["name"][]
    housingCorporations: string[]
    owner: string
    pagination: TABLE.Schemas.Pagination
    projects: string[]
    reason: string
    results: Components.Schemas.CaseUserTask[]
    role?: string
    sorting: TABLE.Schemas.Sorting
    theme: string
    subjects: string[]
    tags: string[]
    taskNames: Components.Schemas.CaseUserTaskTaskName["name"][]
    updateContextTasks: (payload: any) => void
  }
}

// Initial State
export const initialState: StateType = {
  cases: {
    count: 0,
    districtNames: [],
    fromStartDate: "",
    housingCorporations: [],
    pagination: {
      page: 1,
      pageSize: 25
    },
    projects: [],
    reason: "",
    results: [],
    sorting: {
      dataIndex: "start_date",
      order: "DESCEND"
    },
    streetName: "",
    subjects: [],
    tags: [],
    theme: "",
    updateContextCases: noop
  },
  tasks: {
    count: 0,
    districtNames: [],
    housingCorporations: [],
    owner: "",
    pagination: {
      page: 1,
      pageSize: 25
    },
    projects: [],
    reason: "",
    results: [],
    role: undefined,
    sorting: {
      dataIndex: "due_date",
      order: "ASCEND"
    },
    subjects: [],
    tags: [],
    taskNames: [],
    theme: "",
    updateContextTasks: noop
  }
}

export default initialState
