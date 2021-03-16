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

    export type Opinion = {
      readonly id: number
      readonly title: string
    }

    export type Summon = { // used to show summonTitle at OpinionForm
      readonly id: number
      readonly title: string
    }

    export type DueDate = {
      readonly id: number
      readonly dueDate: string
    }
  }
}