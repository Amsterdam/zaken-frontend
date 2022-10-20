const noop = () => {}

export type StateType = {
  cases: {
    results: Components.Schemas.Case[]
    count: number
    pagination: TABLE.Schemas.Pagination
    sorting: TABLE.Schemas.Sorting
    theme: string
    reason: string
    districtNames: Components.Schemas.District["name"][]
    housingCorporations: string[]
    fromStartDate: string
    updateContextCases: (payload: any) => void
  }
  tasks: {
    results: Components.Schemas.CaseUserTask[]
    count: number
    pagination: TABLE.Schemas.Pagination
    sorting: TABLE.Schemas.Sorting
    theme: string
    role?: string
    owner: string
    taskNames: Components.Schemas.CaseUserTaskTaskName["name"][]
    reason: string
    districtNames: Components.Schemas.District["name"][]
    housingCorporations: string[]
    updateContextTasks: (payload: any) => void
  }
}

// Initial State
export const initialState: StateType = {
  cases: {
    results: [],
    count: 0,
    pagination: {
      page: 1,
      pageSize: 25
    },
    sorting: {
      dataIndex: "start_date",
      order: "DESCEND"
    },
    theme: "",
    reason: "",
    districtNames: [],
    housingCorporations: [],
    fromStartDate: "",
    updateContextCases: noop
  },
  tasks: {
    results: [],
    count: 0,
    pagination: {
      page: 1,
      pageSize: 25
    },
    sorting: {
      dataIndex: "due_date",
      order: "ASCEND"
    },
    theme: "",
    role: undefined,
    owner: "",
    taskNames: [],
    reason: "",
    districtNames: [],
    housingCorporations: [],
    updateContextTasks: noop
  }
}

export default initialState
