import { renderHook } from "@testing-library/react"
import { useApiFetch } from "@/api/useApiFetch"

const navigateTo = vi.fn()
let accessToken: string | undefined

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({
    user: accessToken ? { access_token: accessToken } : undefined,
  }),
}))

vi.mock("app/routing/useNavigation", () => ({
  default: () => ({ navigateTo }),
}))

const createResponse = (
  body: string,
  init: { status?: number; statusText?: string } = {},
) => {
  const status = init.status ?? 200
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: init.statusText ?? "OK",
    text: () => Promise.resolve(body),
  }
}

const renderApiFetch = () => renderHook(() => useApiFetch()).result.current

describe("useApiFetch", () => {
  beforeEach(() => {
    accessToken = "mock-token"
    navigateTo.mockClear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("sends a GET request with a Bearer token and returns the JSON body", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(createResponse(JSON.stringify({ hello: "world" })))
    vi.stubGlobal("fetch", fetchMock)

    const data = await renderApiFetch()<{ hello: string }>(
      "https://api.test/things/",
    )

    expect(data).toEqual({ hello: "world" })
    expect(fetchMock).toHaveBeenCalledWith("https://api.test/things/", {
      method: "GET",
      headers: { Authorization: "Bearer mock-token" },
      body: undefined,
    })
  })

  it("leaves out the Authorization header without a token", async () => {
    accessToken = undefined
    const fetchMock = vi.fn().mockResolvedValue(createResponse("null"))
    vi.stubGlobal("fetch", fetchMock)

    await renderApiFetch()("https://api.test/things/")

    expect(fetchMock.mock.calls[0][1].headers).toEqual({})
  })

  it("never sends the token to an external API", async () => {
    const fetchMock = vi.fn().mockResolvedValue(createResponse("null"))
    vi.stubGlobal("fetch", fetchMock)

    await renderApiFetch()("https://api.pdok.nl/search", {
      authenticated: false,
    })

    expect(fetchMock.mock.calls[0][1].headers).toEqual({})
  })

  it("sends the payload as JSON", async () => {
    const fetchMock = vi.fn().mockResolvedValue(createResponse(""))
    vi.stubGlobal("fetch", fetchMock)

    const data = await renderApiFetch()("https://api.test/things/", {
      method: "POST",
      data: { name: "foo" },
    })

    expect(data).toBeNull()
    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer mock-token",
      },
      body: JSON.stringify({ name: "foo" }),
    })
  })

  it("throws an ApiError with the response body, status and url", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        createResponse(JSON.stringify({ detail: "Niet gevonden." }), {
          status: 404,
          statusText: "Not Found",
        }),
      ),
    )

    await expect(
      renderApiFetch()("https://api.test/things/1/"),
    ).rejects.toEqual({
      detail: "Niet gevonden.",
      status: 404,
      message: "Not Found",
      url: "https://api.test/things/1/",
    })
    expect(navigateTo).not.toHaveBeenCalled()
  })

  it("navigates to the auth page on a 403", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          createResponse("", { status: 403, statusText: "Forbidden" }),
        ),
    )

    await expect(
      renderApiFetch()("https://api.test/things/"),
    ).rejects.toMatchObject({ status: 403 })
    expect(navigateTo).toHaveBeenCalledWith("/auth")
  })
  it("does not redirect on a 403 from an external API", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          createResponse("", { status: 403, statusText: "Forbidden" }),
        ),
    )

    await expect(
      renderApiFetch()("https://api.pdok.nl/search", { authenticated: false }),
    ).rejects.toMatchObject({ status: 403 })
    expect(navigateTo).not.toHaveBeenCalled()
  })
})
