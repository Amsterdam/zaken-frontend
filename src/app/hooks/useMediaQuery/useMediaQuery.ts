import { useEffect, useState } from "react"

const useMediaQuery = (minWidth: number) => {
  const [state, setState] = useState({
    windowWidth: window.innerWidth,
    isDesiredWidth: false
  })

  useEffect(() => {
    const resizeHandler = () => {
      const currentWindowWidth = window.innerWidth
      const isDesiredWidth = currentWindowWidth > minWidth
      setState({ windowWidth: currentWindowWidth, isDesiredWidth })
    }
    window.addEventListener("resize", resizeHandler)

    return () => {
      window.removeEventListener("resize", resizeHandler)
    }
  }, [minWidth])

  return state.isDesiredWidth
}

export default useMediaQuery
