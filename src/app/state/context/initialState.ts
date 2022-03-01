const noop = () => {}

export type StateType = {
  results: Components.Schemas.Case[]
  count: number
  pagination: TABLE.Schemas.Pagination
  sorting: TABLE.Schemas.Sorting
  theme: string
  fromStartDate: string
  updateContextState: (payload: any) => void
}

// Initial State
export const initialState: StateType = {
  results: [],
  count: 0,
  pagination: {
    page: 1,
    pageSize: 10
  },
  sorting: {
    dataIndex: "start_date",
    order: "DESCEND"
  },
  theme: "",
  fromStartDate: "",
  updateContextState: noop
}

export default initialState
