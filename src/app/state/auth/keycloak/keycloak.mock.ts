import { env } from "app/config/env"

export default {
  init: async () => {},
  updateToken: async () => {},
  logout: () => {},
  token: env.REACT_APP_API_TOKEN ?? ""
}
