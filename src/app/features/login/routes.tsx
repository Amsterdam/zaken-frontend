import LoginPage from "./components/pages/login/LoginPage"
import CallbackPage from "./components/pages/callback/CallbackPage"
import LogoutPage from "./components/pages/logout/LogoutPage"

export default {
  "/login": {
    publicly: true,
    Page: LoginPage
  },
  "/authentication/callback": {
    publicly: true,
    Page: CallbackPage
  },
  "/logout": LogoutPage
}
