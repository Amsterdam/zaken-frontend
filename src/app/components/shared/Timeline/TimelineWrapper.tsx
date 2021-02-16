import React from "react"

const TimelineWrapper: React.FC = ({ children }) => (
  <div role="button" tabIndex={ -1 }>
    { children }
  </div>
)

export default TimelineWrapper
