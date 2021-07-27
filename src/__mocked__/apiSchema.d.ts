declare namespace MockComponents {
  namespace Schemas {

    export type Correspondence = {
      readonly id: number
      readonly title: string
    }

    export type Role = string

    export type Permissions = {
      permissions: {
        can_add_case: boolean
      }
    }

  }
}
