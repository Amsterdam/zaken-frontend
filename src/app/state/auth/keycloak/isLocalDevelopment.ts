import { env } from "app/config/env"

export default env.NODE_ENV === "development" && env.REACT_APP_API_TOKEN !== undefined
