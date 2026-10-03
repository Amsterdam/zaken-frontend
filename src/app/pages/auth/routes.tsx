import AuthPage from "./AuthPage"
import NotAuthorizedPage from "./NotAuthorizedPage"

export default {
  "/auth": AuthPage,
  // To look at the 403 page without having to lack a permission.
  "/403": NotAuthorizedPage,
}
