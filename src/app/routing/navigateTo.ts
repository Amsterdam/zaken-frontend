import { navigate } from "@reach/router"
import to from "./utils/to"

export default async (path: string, params?: Record<string, unknown>) => { await navigate(to(path, params)) }
