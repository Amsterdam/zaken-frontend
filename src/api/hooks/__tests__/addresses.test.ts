import { act, renderHook, waitFor } from "@testing-library/react"
import { useResidents, useUpdateAddress } from "@/api/hooks"
import { queryKeys } from "@/api/queryKeys"
import { createQueryWrapper } from "@/test-utils/createQueryWrapper"

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ user: { access_token: "mock-token" } }),
}))

vi.mock("@/app/routing/useNavigation", () => ({
  default: () => ({ navigateTo: vi.fn() }),
}))

const jsonResponse = (body: unknown) => ({
  ok: true,
  status: 200,
  statusText: "OK",
  text: () => Promise.resolve(JSON.stringify(body)),
})

describe("useUpdateAddress", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("patches the address and invalidates the whole addresses group, like the old clearCache()", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse({ housing_corporation: 2 }))
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper, queryClient } = createQueryWrapper()
    queryClient.setQueryData(queryKeys.addresses.residents("0363"), {})
    queryClient.setQueryData(queryKeys.users.list(), {})

    const { result } = renderHook(() => useUpdateAddress("0363"), {
      wrapper: Wrapper,
    })
    act(() => result.current.mutate({ housing_corporation: 2 }))

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toMatch(/\/addresses\/0363\/$/)
    expect(init).toMatchObject({
      method: "PATCH",
      body: JSON.stringify({ housing_corporation: 2 }),
    })
    expect(
      queryClient.getQueryState(queryKeys.addresses.residents("0363"))
        ?.isInvalidated,
    ).toBe(true)
    // Other groups are left alone.
    expect(
      queryClient.getQueryState(queryKeys.users.list())?.isInvalidated,
    ).toBe(false)
  })
})

describe("useResidents", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("fetches the residents of an address", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ data: [] }))
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useResidents("0363"), {
      wrapper: Wrapper,
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(fetchMock.mock.calls[0][0]).toMatch(
      /\/addresses\/0363\/residents\/$/,
    )
  })
})
