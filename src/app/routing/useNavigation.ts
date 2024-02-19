import { useNavigate } from "react-router-dom"
import to from "./utils/to"

export type NavigateToFunction = (path: string, params?: Record<string, unknown>) => void;


const useNavigation = () => {
  const navigate = useNavigate()

  const navigateTo = (path: string, params?: Record<string, unknown>) => {
    navigate(to(path, params))
  }

  return { navigateTo }
}

export default useNavigation
