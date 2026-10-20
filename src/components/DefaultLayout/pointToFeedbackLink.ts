import styles from "./pointToFeedbackLink.module.css"

export const FEEDBACK_LINK_ID = "feedback-link"

// Longer than a smooth scroll to the bottom takes, for a browser without the
// scrollend event.
const MAX_SCROLL_MS = 1000

/** Calls `callback` once, when the scroll has come to rest. */
const afterScroll = (callback: () => void) => {
  let isDone = false
  const done = () => {
    if (isDone) return
    isDone = true
    window.removeEventListener("scrollend", done)
    window.clearTimeout(timeout)
    callback()
  }
  window.addEventListener("scrollend", done)
  const timeout = window.setTimeout(done, MAX_SCROLL_MS)
}

/** Removes the spotlight that is shown now, if there is one. */
let removeSpotlight = () => {}

// The room around the element, in pixels; the soft edge of the hole (the blur
// in the CSS) begins to darken it halfway.
const SPOTLIGHT_ROOM = 16

/**
 * Darkens the window for a moment, except for a hole around `element`.
 * Clicks go through it; a click or key press removes it at once.
 */
const showSpotlight = (element: HTMLElement) => {
  removeSpotlight()

  // The hole has the shape of the element, with room around it.
  const { left, top, width, height } = element.getBoundingClientRect()
  const spotlight = document.createElement("div")
  spotlight.className = styles.spotlight
  spotlight.setAttribute("aria-hidden", "true")
  Object.assign(spotlight.style, {
    left: `${left - SPOTLIGHT_ROOM}px`,
    top: `${top - SPOTLIGHT_ROOM}px`,
    width: `${width + 2 * SPOTLIGHT_ROOM}px`,
    height: `${height + 2 * SPOTLIGHT_ROOM}px`,
  })

  const remove = () => {
    spotlight.remove()
    window.removeEventListener("pointerdown", remove, true)
    window.removeEventListener("keydown", remove, true)
    removeSpotlight = () => {}
  }
  spotlight.addEventListener("animationend", remove)
  window.addEventListener("pointerdown", remove, true)
  window.addEventListener("keydown", remove, true)
  removeSpotlight = remove

  document.body.append(spotlight)
}

/**
 * Shows where the feedback went: scrolls to the bottom of the page, gives the
 * link in the footer the focus and puts it in the spotlight for a moment.
 */
export const pointToFeedbackLink = () => {
  const link = document.getElementById(FEEDBACK_LINK_ID)
  if (!link) return

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches
  // All the way down: the footer is the end of the page.
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: reduceMotion ? "auto" : "smooth",
  })
  // Without its own scroll, so the smooth one goes on.
  link.focus({ preventScroll: true })

  // Only where the link ends up is the hole of the spotlight.
  if (reduceMotion) showSpotlight(link)
  else afterScroll(() => showSpotlight(link))
}
