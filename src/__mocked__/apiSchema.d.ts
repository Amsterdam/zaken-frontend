declare namespace MockComponents {
  namespace Schemas {
    export type Team = {
      readonly id: number
      readonly title: string
    }

    export type View = {
      readonly id: number
      case: number
      author: string // uuid
      readonly date_added: string // date-time
      result_view?: ViolationEnum
  }
  }
}