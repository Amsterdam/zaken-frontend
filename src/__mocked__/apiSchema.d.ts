declare namespace MockComponents {
  namespace Schemas {

    export type CaseProject = {
      id: number
      name: string
      theme: number
    }
    
    export type PaginatedCaseProjectList = {
      count: number
      next: any
      previous: any
      results: Project[]
    }

    export type Correspondence = {
      readonly id: number
      readonly title: string
    }

    export type Role = string
    
  }
}