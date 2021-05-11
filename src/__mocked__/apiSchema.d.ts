declare namespace MockComponents {
  namespace Schemas {

    export type CompleteCaseResult = {
      readonly id: number
      readonly title: string
    }

    export type CompleteCaseReason = {
      readonly id: number
      readonly title: string
      readonly value: string
    }

    export type Correspondence = {
      readonly id: number
      readonly title: string
    }

    export type Role = string

    export type Signal = {}
  }
}