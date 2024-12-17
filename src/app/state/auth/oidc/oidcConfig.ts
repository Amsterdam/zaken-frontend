import { env } from "app/config/env"

/*
 ** You must provide an implementation of onSigninCallback to oidcConfig to remove the payload from the URL upon successful login.
 ** Otherwise if you refresh the page and the payload is still there, signinSilent - which handles renewing your token - won't work.
 */

export const onSigninCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname)
}

export const oidcConfig = {
  authority:
    "https://login.microsoftonline.com/72fca1b1-2c2e-4376-a445-294d80196804",
  client_id: `${ env.VITE_OIDC_CLIENT_ID }`,
  redirect_uri: `${ env.VITE_OIDC_REDIRECT_URL }`,
  response_type: "code",
  scope: `openid email api://${ env.VITE_OIDC_CLIENT_ID }/user_impersonation`,
  post_logout_redirect_uri: `${ env.VITE_OIDC_REDIRECT_URL }`,
  metadata: {
    issuer:
      "https://login.microsoftonline.com/72fca1b1-2c2e-4376-a445-294d80196804/v2.0",
    authorization_endpoint:
      "https://login.microsoftonline.com/72fca1b1-2c2e-4376-a445-294d80196804/oauth2/v2.0/authorize",
    token_endpoint:
      "https://login.microsoftonline.com/72fca1b1-2c2e-4376-a445-294d80196804/oauth2/v2.0/token",
    end_session_endpoint:
      "https://login.microsoftonline.com/common/oauth2/v2.0/logout"
  },
  onSigninCallback
}
