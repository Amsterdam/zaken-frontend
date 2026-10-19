import styles from "./pointToFeedbackLink.module.css"

export const FEEDBACK_LINK_ID = "feedback-link"

/**
 * Shows where the feedback went: scrolls to the bottom of the page, gives the
 * link in the footer the focus and lets it light up for a moment.
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

  link.classList.remove(styles.highlight)
  // Starts the animation again when it is still running.
  void link.offsetWidth
  link.classList.add(styles.highlight)
  link.addEventListener(
    "animationend",
    () => link.classList.remove(styles.highlight),
    { once: true },
  )
}
