import { useNavigate } from "react-router"

const useNavigation = () => {
  const navigate = useNavigate()

  const navigateTo = (path: string) => {
    navigate(path)
  }

  return { navigateTo }
}

export default useNavigation
