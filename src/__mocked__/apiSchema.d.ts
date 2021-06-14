declare namespace MockComponents {
  namespace Schemas {

    export type CompleteCase = {
      readonly id: number
      readonly explanation: string
      readonly case: number
      readonly reason: number
      readonly result: number
    }

    export type CaseCloseReason = {
      readonly id: number
      readonly result: boolean
      readonly name: string
      readonly case_theme: number
    }

    export type CaseCloseResult = {
      readonly id: number
      readonly name: string
      readonly case_theme: number
    }

    export type Correspondence = {
      readonly id: number
      readonly title: string
    }

    export type Role = string
    
  }
}