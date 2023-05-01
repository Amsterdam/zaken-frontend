const noop = () => {}

export type StateType = {
  cases: {
    count: number
    districtNames: Components.Schemas.District["name"][]
    fromStartDate: string
    housingCorporations: string[]
    pagination: TABLE.Schemas.Pagination
    reason: string
    results: Components.Schemas.Case[]
    sorting: TABLE.Schemas.Sorting
    subjects: string[]
    theme: string
    updateContextCases: (payload: any) => void
  }
  tasks: {
    count: number
    districtNames: Components.Schemas.District["name"][]
    housingCorporations: string[]
    owner: string
    pagination: TABLE.Schemas.Pagination
    reason: string
    results: Components.Schemas.CaseUserTask[]
    role?: string
    sorting: TABLE.Schemas.Sorting
    theme: string
    subjects: string[]
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
    reason: "",
    results: [],
    sorting: {
      dataIndex: "start_date",
      order: "DESCEND"
    },
    subjects: [],
    theme: "",
    updateContextCases: noop
  },
  tasks: {
    count: 0,
    districtNames: [],
    housingCorporations: [],
    pagination: {
      page: 1,
      pageSize: 25
    },
    owner: "",
    reason: "",
    results: [],
    role: undefined,
    sorting: {
      dataIndex: "due_date",
      order: "ASCEND"
    },
    subjects: [],
    taskNames: [],
    theme: "",
    updateContextTasks: noop
  }
}

export default initialState
