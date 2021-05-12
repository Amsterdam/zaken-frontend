declare namespace MockComponents {
  namespace Schemas {

    export type CompleteCase = {
      readonly id: number
      readonly title: string
    }

    export type CompleteCaseResult = {
      readonly id: number
      readonly title: string
    }

    export type CompleteCaseReason = {
      readonly id: number
      readonly name: string
      readonly value: number
    }

    export type Correspondence = {
      readonly id: number
      readonly title: string
    }

    export type Role = string

    export type Signal = {}
  }
}