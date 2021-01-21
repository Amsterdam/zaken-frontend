declare namespace MockComponents {
  namespace Schemas {

    export type Case = {
      id: number
      team: {id: number, title: string}
      mocked: boolean
    }
    export type CaseRequestBody = any

    export type CompleteCase = {
      readonly id: number
      readonly title: string
    }

    export type Correspondence = {
      readonly id: number
      readonly title: string
    }

    export type Decision = {
      readonly id: number
      readonly title: string
    }

    export type Opinion = {
      readonly id: number
      readonly title: string
    }

    export type Reason = {
      readonly id: number
      readonly title: string
      readonly enabled: boolean
    }

    export type Summon = {
      readonly id: number
      readonly title: string
    }

    export type Task = {
      readonly camunda_task_id: string
      readonly task_name_id: string
      readonly name: string
      readonly role: string
      readonly end_date: string
      readonly processing: string
      readonly complete: boolean
    }

    export type Team = {
      readonly id: number
      readonly title: string
      readonly enabled: boolean
    }

    export type Visit = {
      readonly id: number
      situation?: string | null
      observations?: string[] | null
      start_time: string // date-time
      description?: string | null
      can_next_visit_go_ahead?: boolean | null
      can_next_visit_go_ahead_description?: string | null
      suggest_next_visit?: string | null
      suggest_next_visit_description?: string | null
      personal_notes?: string | null
      case_id: number
      itinerary_item?: null | number
      author: string // uuid
    }
  }
}