import { isAcceptanceOrLocalEnvironment } from "app/config/isAcceptanceOrLocalEnvironment"

type Query = { isPending: boolean; isError: boolean }

/**
 * Outside production an address without data shows made-up data, so there is
 * something to look at and test with. Not while loading and not when the
 * request failed.
 */
export const shouldShowDummyData = (
  { isPending, isError }: Query,
  numItems: number,
) =>
  isAcceptanceOrLocalEnvironment() && !isPending && !isError && numItems === 0
