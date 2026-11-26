type CaseEvent =
  | CaseCreatedEvent
  | GenericTaskEvent
  | DebriefingEvent
  | ScheduleEvent
  | VisitEvent
  | ExternalTeamReportEvent
type BaseCaseEvent<
  TType extends string,
  TValues,
  TVariables = Record<string, unknown>,
> = {
  id: number
  event_values: TValues
  event_variables: TVariables
  date_created: string
  type: TType
  emitter_id: number
  case: number
}

type CaseCreatedEvent = BaseCaseEvent<
  "CASE",
  {
    start_date: string
    end_date: string | null
    reason: string
    description: string | null
    author: string
    subjects: string[]
    mma_number: string | null
    previous_case: number | null
  }
>

type GenericTaskEvent = BaseCaseEvent<
  "GENERIC_TASK",
  {
    author: string
    date_added: string
    description: string
  },
  {
    visit_next_step?: {
      label: string
      value: string
    }
  }
>

type DebriefingEvent = BaseCaseEvent<
  "DEBRIEFING",
  {
    author: string
    date_added: string
    violation: string
    feedback: string
    nuisance_detected: boolean
  }
>

type ScheduleEvent = BaseCaseEvent<
  "SCHEDULE",
  {
    date_added: string
    action: string
    week_segment: string
    day_segment: string
    priority: string
    description: string | null
    author: string
    visit_from_datetime: string | null
    housing_corporation_combiteam: boolean
    is_additional: boolean
  }
>

type VisitEvent = BaseCaseEvent<
  "VISIT",
  {
    start_time: string
    situation?: string
    observations?: string
    can_next_visit_go_ahead?: boolean
  }
>

type ExternalTeamReportEvent = BaseCaseEvent<
  "EXTERNAL_TEAM_REPORT",
  {
    date_added: string
    author: string
    reporter_team_name: string
    reporter_name: string
    reporter_phone: string | null
    reporter_email: string | null
    description_external_team_report: string | null
    advertisement_linklist: string[] | null
    nuisance: boolean
  }
>
