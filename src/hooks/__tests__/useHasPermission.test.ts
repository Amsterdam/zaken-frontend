import { renderHook } from "@testing-library/react"
import useHasPermission, {
  CAN_PERFORM_TASK,
  SENSITIVE_CASE_PERMISSION,
} from "@/hooks/useHasPermission"

let me: { data?: { permissions: string[] }; isLoading: boolean }

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => me,
}))

const render = (permissions?: Parameters<typeof useHasPermission>[0]) =>
  renderHook(() => useHasPermission(permissions)).result.current

describe("useHasPermission", () => {
  beforeEach(() => {
    me = { data: { permissions: [CAN_PERFORM_TASK] }, isLoading: false }
  })

  it("allows when no permission is needed", () => {
    expect(render(undefined)).toEqual([true, false])
  })

  it("is loading while the user isn't loaded", () => {
    me = { data: undefined, isLoading: true }
    expect(render([CAN_PERFORM_TASK])).toEqual([false, true])
  })

  it("allows when the user has one of the permissions", () => {
    expect(render([SENSITIVE_CASE_PERMISSION, CAN_PERFORM_TASK])).toEqual([
      true,
      false,
    ])
  })

  it("denies when the user has none of the permissions", () => {
    expect(render([SENSITIVE_CASE_PERMISSION])).toEqual([false, false])
  })
})
