import { navigate } from "@reach/router"
import to from "./utils/to"

export default (path: string, params?: Record<string, unknown>) => navigate(to(path, params))