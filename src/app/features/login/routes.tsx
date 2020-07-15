import LoginPage from "./components/pages/login/LoginPage"
import CallbackPage from "./components/pages/callback/CallbackPage"
import LogoutPage from "./components/pages/logout/LogoutPage"

export default {
  "/login": LoginPage,
  "/authentication/callback": CallbackPage,
  "/logout": LogoutPage
}
