declare namespace MockComponents {
  namespace Schemas {

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
      isSanction?: boolean
    }

    export type Summon = {
      readonly id: number
      type: number
      case: number
      persons: SummonedPerson[]
      readonly date_added: string // date-time
      description?: string | null
    }

    export type DueDate = {
      readonly id: number
      readonly dueDate: string
    }
  }
}