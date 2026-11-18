import { useCallback, useEffect, useState } from "react"

export type AnchoredPosition = {
  top: number
  left: number
  // Chosen when the list opens and kept, so it does not jump while scrolling.
  placement: "below" | "above"
}

const GAP = 4
const VIEWPORT_MARGIN = 8

// A position on the page, not on the screen: the list scrolls along with the
// page, also out of view, like a select in Jira.
const getPosition = (
  anchor: HTMLElement,
  placement: AnchoredPosition["placement"],
): AnchoredPosition => {
  const rect = anchor.getBoundingClientRect()
  return {
    // Above the anchor, the list is moved up by its own height (see
    // getAnchoredStyle), so its real height does not matter.
    top:
      placement === "below"
        ? rect.bottom + window.scrollY + GAP
        : rect.top + window.scrollY - GAP,
    left: rect.left + window.scrollX,
    placement,
  }
}

// Below the anchor, or above it when there is not enough room below and more
// room above.
const choosePlacement = (
  anchor: HTMLElement,
  maxHeight: number,
): AnchoredPosition["placement"] => {
  const rect = anchor.getBoundingClientRect()
  const spaceBelow = window.innerHeight - VIEWPORT_MARGIN - rect.bottom - GAP
  const spaceAbove = rect.top - VIEWPORT_MARGIN - GAP
  return spaceBelow >= maxHeight || spaceBelow >= spaceAbove ? "below" : "above"
}

// Positions a list, rendered in a portal in document.body, next to the button
// that opens it. The list stays open while scrolling; the caller closes it on a
// click outside, Escape or a choice.
const useAnchoredPosition = (
  anchorRef: React.RefObject<HTMLElement | null>,
  maxHeight: number,
) => {
  const [position, setPosition] = useState<AnchoredPosition | null>(null)
  const isOpen = position !== null

  const open = useCallback(() => {
    const anchor = anchorRef.current
    if (!anchor) return
    setPosition(getPosition(anchor, choosePlacement(anchor, maxHeight)))
  }, [anchorRef, maxHeight])

  const close = useCallback(() => setPosition(null), [])

  // The page scrolls the list along by itself. An element that scrolls, such
  // as a table that is wider than the page, does not, and neither does a
  // resize, so then the position is calculated again.
  useEffect(() => {
    if (!isOpen) return
    const update = () => {
      const anchor = anchorRef.current
      if (!anchor) return
      setPosition((current) =>
        current ? getPosition(anchor, current.placement) : current,
      )
    }
    const handleScroll = (event: Event) => {
      const target = event.target
      if (target instanceof Element && target.contains(anchorRef.current)) {
        update()
      }
    }
    window.addEventListener("scroll", handleScroll, true)
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", handleScroll, true)
      window.removeEventListener("resize", update)
    }
  }, [isOpen, anchorRef])

  return { position, open, close }
}

export const getAnchoredStyle = ({
  top,
  left,
  placement,
}: AnchoredPosition): React.CSSProperties => ({
  position: "absolute",
  top,
  left,
  transform: placement === "above" ? "translateY(-100%)" : undefined,
})

export default useAnchoredPosition
