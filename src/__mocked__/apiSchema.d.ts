declare namespace MockComponents {
  namespace Schemas {

    export type CompleteCase = {
      readonly id: number
      readonly title: string
      readonly value: string
    }

    export type CompleteCaseReason = {
      readonly id: number
      readonly name: string
    }

    export type Correspondence = {
      readonly id: number
      readonly title: string
    }

    export type Role = string

    export type Signal = {}
  }
}