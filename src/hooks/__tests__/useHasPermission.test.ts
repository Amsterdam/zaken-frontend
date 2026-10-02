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

  it("denies when nothing is asked", () => {
    expect(render([])).toEqual([false, false])
  })

  // The old check looked for a duplicate in both lists merged, which gave
  // access in these cases too.
  it("denies when the user's own permissions contain a duplicate", () => {
    me = {
      data: { permissions: [CAN_PERFORM_TASK, CAN_PERFORM_TASK] },
      isLoading: false,
    }
    expect(render([SENSITIVE_CASE_PERMISSION])).toEqual([false, false])
  })

  it("denies when a permission the user doesn't have is asked twice", () => {
    expect(
      render([SENSITIVE_CASE_PERMISSION, SENSITIVE_CASE_PERMISSION]),
    ).toEqual([false, false])
  })
})
