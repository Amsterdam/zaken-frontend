import { navigate } from "@reach/router"
import to from "./utils/to"

export default (path: string) => navigate(to(path))