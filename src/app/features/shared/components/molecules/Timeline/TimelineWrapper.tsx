import React, { useRef } from "react"

const TimelineWrapper: React.FC = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div role="button" tabIndex={-1} ref={ref}>
      {children}
    </div>
  )
}

export default TimelineWrapper
