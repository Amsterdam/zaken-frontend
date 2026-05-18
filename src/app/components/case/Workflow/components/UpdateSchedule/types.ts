export type Schedule = Omit<
  Components.Schemas.ScheduleCreate,
  "priority"
> & {
  id: number
  date_modified: string // date-time
  priority: {
    id: number
    name: string
  }
};
