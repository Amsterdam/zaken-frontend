declare namespace MockComponents {
  namespace Schemas {

    export type CompleteCase = {
      readonly id: number
      readonly title: string
    }

    export type Correspondence = {
      readonly id: number
      readonly title: string
    }

    export type Task = {
      label: string
      value: number
    }

    export type Signal = {}
  }
}