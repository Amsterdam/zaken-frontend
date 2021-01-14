declare namespace MockComponents {
  namespace Schemas {
    export type Team = {
      readonly id: number
      readonly title: string
      readonly enabled: boolean
    }
    export type Reason = {
      readonly id: number
      readonly title: string
      readonly enabled: boolean
    }

    export type OpinionEnum = "NO" | "YES";

    export type Summon = {
      readonly id: number
      readonly title: string
    }

    export type Opinion = {
      readonly id: number
      case: number
      author: string // uuid
      readonly date_added: string // date-time
      result_opinion?: OpinionEnum
    }

    export type Case = {
      id: number
      mocked: boolean
    }
  }
}