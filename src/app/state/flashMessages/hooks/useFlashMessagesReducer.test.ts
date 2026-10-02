import { reducer, type State } from "./useFlashMessagesReducer"

const error = {
  title: "Oeps er ging iets mis!",
  children: "Internal Server Error (URL: https://api.test/cases/1/workflows/)",
  level: "error" as const,
  dismissible: true,
}

const add = (state: State, props = error) =>
  reducer(state, { type: "add", path: "current", props })

describe("flash messages reducer", () => {
  it("does not add a message that is already shown", () => {
    // E.g. five failed poll attempts of the same request.
    let state: State = {}
    for (let i = 0; i < 5; i++) {
      state = add(state)
    }

    expect(state.current).toHaveLength(1)
  })

  it("does add a different message", () => {
    const state = add(add({}), { ...error, children: "Andere fout (URL: -)" })

    expect(state.current).toHaveLength(2)
  })

  it("removes a dismissed message, so the same message can be shown again later", () => {
    const state = add({})
    const { messageId } = state.current[0]

    const dismissed = reducer(state, {
      type: "remove",
      path: "current",
      messageId,
    })
    expect(dismissed.current).toHaveLength(0)

    const shownAgain = add(dismissed)
    expect(shownAgain.current).toHaveLength(1)
    // A new key, so React doesn't reuse the dismissed (closed) Alert.
    expect(shownAgain.current[0].messageId).not.toBe(messageId)
  })

  it("only removes the dismissed message", () => {
    const state = add(add({}), { ...error, children: "Andere fout (URL: -)" })

    const dismissed = reducer(state, {
      type: "remove",
      path: "current",
      messageId: state.current[0].messageId,
    })

    expect(dismissed.current.map(({ children }) => children)).toEqual([
      "Andere fout (URL: -)",
    ])
  })
})
