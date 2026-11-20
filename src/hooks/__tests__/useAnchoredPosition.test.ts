import { act, renderHook } from "@testing-library/react"
import useAnchoredPosition, {
  getAnchoredStyle,
} from "@/hooks/useAnchoredPosition"

const MAX_HEIGHT = 256

const rect = (top: number, left: number, height = 20, width = 40) =>
  ({
    top,
    left,
    bottom: top + height,
    right: left + width,
    height,
    width,
    x: left,
    y: top,
    toJSON: () => ({}),
  }) as DOMRect

let anchorRect = rect(100, 50)

// The anchor sits in an element that scrolls, like the wrapper of the table.
const setup = () => {
  const scroller = document.createElement("div")
  const anchor = document.createElement("button")
  anchor.getBoundingClientRect = () => anchorRect
  scroller.appendChild(anchor)
  document.body.appendChild(scroller)
  const hook = renderHook(() =>
    useAnchoredPosition({ current: anchor }, MAX_HEIGHT),
  )
  return { ...hook, scroller }
}

describe("useAnchoredPosition", () => {
  beforeEach(() => {
    anchorRect = rect(100, 50)
    window.innerHeight = 768
    window.scrollX = 0
    window.scrollY = 0
    document.body.innerHTML = ""
  })

  it("is closed until it is opened", () => {
    const { result } = setup()

    expect(result.current.position).toBeNull()
  })

  it("opens below the anchor, on the page instead of on the screen", () => {
    window.scrollY = 300
    const { result } = setup()

    act(() => result.current.open())

    expect(result.current.position).toEqual({
      top: 100 + 20 + 300 + 4,
      left: 50,
      placement: "below",
    })
  })

  it("opens above the anchor when there is not enough room below", () => {
    anchorRect = rect(700, 50)
    const { result } = setup()

    act(() => result.current.open())

    expect(result.current.position).toEqual({
      top: 700 - 4,
      left: 50,
      placement: "above",
    })
  })

  it("stays below when there is more room below than above", () => {
    window.innerHeight = 400
    anchorRect = rect(150, 50)
    const { result } = setup()

    act(() => result.current.open())

    expect(result.current.position?.placement).toBe("below")
  })

  it("closes", () => {
    const { result } = setup()

    act(() => result.current.open())
    act(() => result.current.close())

    expect(result.current.position).toBeNull()
  })

  it("stays put when the page scrolls, because it scrolls along", () => {
    const { result } = setup()
    act(() => result.current.open())
    const opened = result.current.position

    anchorRect = rect(-500, 50)
    act(() => {
      document.dispatchEvent(new Event("scroll"))
    })

    expect(result.current.position).toBe(opened)
  })

  it("follows the anchor when an element around it scrolls", () => {
    const { result, scroller } = setup()
    act(() => result.current.open())

    anchorRect = rect(100, -30)
    act(() => {
      scroller.dispatchEvent(new Event("scroll"))
    })

    expect(result.current.position).toEqual({
      top: 124,
      left: -30,
      placement: "below",
    })
  })

  it("keeps its side when it moves", () => {
    anchorRect = rect(700, 50)
    const { result } = setup()
    act(() => result.current.open())

    anchorRect = rect(100, 50)
    act(() => {
      window.dispatchEvent(new Event("resize"))
    })

    expect(result.current.position).toEqual({
      top: 96,
      left: 50,
      placement: "above",
    })
  })
})

describe("getAnchoredStyle", () => {
  it("moves a list above the anchor up by its own height", () => {
    expect(getAnchoredStyle({ top: 96, left: 50, placement: "above" })).toEqual(
      {
        position: "absolute",
        top: 96,
        left: 50,
        transform: "translateY(-100%)",
      },
    )
  })

  it("does not move a list below the anchor", () => {
    expect(
      getAnchoredStyle({ top: 124, left: 50, placement: "below" }).transform,
    ).toBeUndefined()
  })
})
