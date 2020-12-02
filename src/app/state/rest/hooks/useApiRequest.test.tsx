import React from "react"
import nock from "nock"

import { renderHook, act } from "@testing-library/react-hooks"
import useApiRequest from "./useApiRequest"
import ApiProvider from "../provider/ApiProvider"
import KeycloakProvider from "app/state/auth/keycloak/KeycloakProvider"

type Pet = {
  name: string
  type: string
}

const Wrapper: React.FC = ({ children }) => (
    <KeycloakProvider>
      <ApiProvider>
        { children }
      </ApiProvider>
    </KeycloakProvider>
  )

xdescribe("useApiRequest", () => {
  it("should perform a GET request on mount", async () => {
    const usePet = () => useApiRequest<Pet>({ url: "http://localhost/pet", groupName: "cases" })

    // Define nock scope:
    const scope = nock("http://localhost")
      .get("/pet")
      .reply(200, { name: "Fifi", type: "dog" })

    const { result, waitForNextUpdate } = renderHook(usePet, { wrapper: Wrapper })

    // Busy... no results yet.
    expect(result.current.isBusy).toEqual(true)
    expect(result.current.data).toEqual(undefined)

    // Make API respond:
    await act(() => waitForNextUpdate())
    await act(() => waitForNextUpdate())

    // not busy anymore... results are in!
    expect(result.current.isBusy).toEqual(false)
    expect(result.current.data).toEqual({ name: "Fifi", type: "dog" })

    expect(scope.isDone()).toEqual(true) // <- all scoped endpoints are called
  })

  it("should NOT perform duplicate requests", async () => {
    const usePet = () => useApiRequest<Pet>({ url: "http://localhost/pet", groupName: "cases" })

    const scope = nock("http://localhost")
      .get("/pet")
      .once() // <- Make nock return ony once! (Will throw error when called twice)
      .reply(200, { name: "Fifi", type: "dog" })

    const useTwoHooks = () => ({
      first: usePet(),
      second: usePet()
    })

    const { result, waitForNextUpdate } = renderHook(useTwoHooks, { wrapper: Wrapper })

    // Busy...
    expect(result.current.first.isBusy).toEqual(true)
    expect(result.current.second.isBusy).toEqual(true)
    // no results yet....
    expect(result.current.first.data).toEqual(undefined)
    expect(result.current.second.data).toEqual(undefined)

    await act(() => waitForNextUpdate())
    await act(() => waitForNextUpdate())

    // not busy anymore
    expect(result.current.first.isBusy).toEqual(false)
    expect(result.current.second.isBusy).toEqual(false)
    // Results are in!
    expect(result.current.first.data).toEqual({ name: "Fifi", type: "dog" })
    expect(result.current.second.data).toEqual({ name: "Fifi", type: "dog" })

    expect(scope.isDone()).toEqual(true) // <- all scoped endpoints are called
  })

  test.each([
    [ "POST",
      (scope: nock.Scope) => scope.post("/pet").reply(200),
      (hook: any) => hook.execPost({ name: "popo" })
    ],
    [ "PUT",
      (scope: nock.Scope) => scope.put("/pet").reply(200),
      (hook: any) => hook.execPut({ name: "popo" })
    ],
    [ "PATCH",
      (scope: nock.Scope) => scope.patch("/pet").reply(200),
      (hook: any) => hook.execPatch({ name: "popo" })
    ],
    [ "DELETE",
      (scope: nock.Scope) => scope.delete("/pet").reply(200),
      (hook: any) => hook.execDelete()
    ]
  ])("should re-execute a GET after a %s", async (method, prepareScope, exec) => {
    const usePet = () => useApiRequest<Pet>({ url: "http://localhost/pet", groupName: "cases" })

    const scope = nock("http://localhost")
      .get("/pet")
      .reply(200, { name: "Fifi", type: "dog" })
      .get("/pet")
      .reply(200, { name: "Popo", type: "dog" })

    prepareScope(scope)

    const onSuccess = jest.fn()
    const { result, waitForNextUpdate } = renderHook(usePet, { wrapper: Wrapper })
    await act(() => waitForNextUpdate())
    await act(() => waitForNextUpdate())

    // On mount, "Fifi" should be fetched
    expect(result.current.data).toEqual({ name: "Fifi", type: "dog" })

    await act(async () => {
      await exec(result.current).then(onSuccess)
      return waitForNextUpdate()
    })

    // Cache was cleared. Data should be undefined now:
    expect(result.current.data).toEqual(undefined)

    // New fetch should happen
    await act(() => waitForNextUpdate())
    expect(result.current.data).toEqual({ name: "Popo", type: "dog" })

    expect(onSuccess).toHaveBeenCalled()
    expect(scope.isDone()).toEqual(true) // <- all scoped endpoints are called
  })

  it("should call the error handler when a error occurs", async () => {
    const handleError = jest.fn()
    const usePet = () => useApiRequest<Pet>({ url: "http://localhost/pet", groupName: "cases", handleError })

    const scope = nock("http://localhost")
      .get("/pet")
      .reply(500, { detail: "S.O.S." })

    const { waitForNextUpdate } = renderHook(usePet, { wrapper: Wrapper })
    await act(() => waitForNextUpdate())
    await act(() => waitForNextUpdate())

    expect(handleError).toHaveBeenCalledWith(expect.objectContaining({
      message: "Request failed with status code 500",
      response: expect.objectContaining({
        status: 500,
        data: { detail: "S.O.S." }
      })
    }))

    expect(scope.isDone()).toEqual(true) // <- all scoped endpoints are called
  })
})
