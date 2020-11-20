import React from "react"
import { Heading, Alert } from "@datapunt/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import DefinitionList from "app/features/shared/components/molecules/DefinitionList/DefinitionList"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import { useIsAuthorized } from "app/state/rest/"

const AuthPage: React.FC = () => {
  const keycloak = useKeycloak()
  const { data } = useIsAuthorized()
  const showUnauthorized = data?.isAuthorized === false

  const values = {
    Naam: keycloak.tokenParsed?.name ?? "-",
    "E-mail": keycloak.tokenParsed?.email ?? "-",
    Gebruikersnaam: keycloak.tokenParsed?.preferred_username ?? "-",
    "Keycloak groepen": keycloak.realmAccess?.roles.join(", ") ?? "-"
  }

  return (
    <DefaultLayout>
      <Heading as="h2">Keycloak gebruiker</Heading>
      { showUnauthorized &&
        <Alert level="error">Je bent niet geauthorizeerd. Waarschijnlijk staan de Keycloak groepen gekoppeld aan je ADW account niet goed ingesteld.</Alert>
      }
      <DefinitionList values={ values } />
    </DefaultLayout>
  )
}

export default AuthPage
