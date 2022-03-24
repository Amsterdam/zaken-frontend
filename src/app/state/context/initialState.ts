const noop = () => {};

export type StateType = {
  cases: {
    results: Components.Schemas.Case[]
    count: number
    pagination: TABLE.Schemas.Pagination
    sorting: TABLE.Schemas.Sorting
    theme: string
    fromStartDate: string
    updateContextCases: (payload: any) => void
  }
  tasks: {
    results: Components.Schemas.CaseUserTask[]
    count: number
    pagination: TABLE.Schemas.Pagination
    sorting: TABLE.Schemas.Sorting
    theme: string
    role: string
    owner: string
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
      pageSize: 10,
    },
    sorting: {
      dataIndex: 'start_date',
      order: 'DESCEND',
    },
    theme: '',
    fromStartDate: '',
    updateContextCases: noop,
  },
  tasks: {
    results: [],
    count: 0,
    pagination: {
      page: 1,
      pageSize: 10,
    },
    sorting: {
      dataIndex: 'due_date',
      order: 'ASCEND',
    },
    theme: '',
    role: '',
    owner: '',
    updateContextTasks: noop,
  },
};

export default initialState;
