import React from "react"
import icons from "./icons"

type CustomIconProps = {
  name: keyof typeof icons
  color?: string
  size?: number
}

const CustomIcon: React.FC<CustomIconProps> = ({ name, color = "currentColor", size = 24 }) => {
  const SvgComponent: any = icons[name]

  if (!SvgComponent) {
    console.error(`Icon with name "${ name }" does not exist.`)
    return null
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      width={size}
      height={size}
      aria-hidden="true"
    >
      <SvgComponent />
    </svg>
  )
}

export default CustomIcon
