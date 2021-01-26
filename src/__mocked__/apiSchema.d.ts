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

    export type Team = {
      readonly id: number
      readonly title: string
      readonly enabled: boolean
    }
  }
}