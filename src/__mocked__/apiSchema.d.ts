declare namespace MockComponents {
  namespace Schemas {

    export type Case = {
      id: number
      mocked: boolean
    }
    export type CaseRequestBody = any

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