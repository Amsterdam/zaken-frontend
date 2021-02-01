import { navigate } from "@reach/router"
import to from "./to"

export default (path: string) => navigate(to(path))