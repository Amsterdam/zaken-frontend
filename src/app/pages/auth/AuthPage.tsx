import React from "react"
import { Heading } from "@amsterdam/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import NotAuthorizedAlert from "app/features/auth/NotAuthorizedAlert/NotAuthorizedAlert"
import KeycloakValues from "app/features/auth/KeycloakValues/KeycloadValues"

const AuthPage: React.FC = () => (
  <DefaultLayout>
    <Heading as="h2">Keycloak gebruiker</Heading>
    <NotAuthorizedAlert />
    <KeycloakValues />
  </DefaultLayout>
)

export default AuthPage
