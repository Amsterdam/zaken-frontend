const noop = () => {}

export type StateType = {
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
