// TODO Get environment from .env file
const { hostname } = window.location
const environment =
  hostname === process.env.REACT_APP_DOMAIN_PRODUCTION ? "production" :
  hostname === process.env.REACT_APP_DOMAIN_ACCEPTANCE ? "acceptance" :
  undefined
export default environment
