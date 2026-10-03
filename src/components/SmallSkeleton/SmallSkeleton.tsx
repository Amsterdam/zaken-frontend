import { useState } from "react"
import styles from "./SmallSkeleton.module.css"

type Props = {
  height?: number
  maxRandomWidth?: number
}

/** A grey bar of a random width, shown while content is loading (from zwd-frontend). */
export function SmallSkeleton({ maxRandomWidth = 100, height = 5 }: Props) {
  const [width] = useState(
    () => Math.round(Math.random() * (maxRandomWidth - 50)) + 50,
  )

  return (
    <div
      className={styles.skeleton}
      style={{ width, height: height * 4 }}
      data-testid="small-skeleton"
    />
  )
}

export default SmallSkeleton
