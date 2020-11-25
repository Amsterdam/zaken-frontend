export default {
  init: async () => {},
  updateToken: async () => {},
  logout: () => {},
  token: process.env.REACT_APP_GATEWAY_TOKEN ?? ""
}
console.log(process.env.REACT_APP_GATEWAY_TOKEN)
