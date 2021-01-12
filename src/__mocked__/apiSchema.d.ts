declare namespace MockComponents {
  namespace Schemas {
    export type Team = {
      readonly id: number
      readonly title: string
    }

    export type OpinionEnum = "NO" | "YES";

    export type Summon = {
      readonly id: number
      readonly title: string
    }

    export type Opinion = {
      readonly id: number
      case: number
      summon?: MockComponents.Schemas.Summon
      author: string // uuid
      readonly date_added: string // date-time
      result_opinion?: OpinionEnum
    }
  }
}