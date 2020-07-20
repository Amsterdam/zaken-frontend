import PromiseQueue from "./PromiseQueue"

export type Pending = Record<string, any>

export type GroupConfig = {
  groupName: string
  pending: Pending
  queue: PromiseQueue
}

export const createGroupConfig = (groupName: string): GroupConfig => ({
  groupName,
  pending: {},
  queue: new PromiseQueue()
})
