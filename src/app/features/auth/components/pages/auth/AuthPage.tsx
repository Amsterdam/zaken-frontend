import React from "react"
import { Heading } from "@datapunt/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import DefinitionList from "app/features/shared/components/molecules/DefinitionList/DefinitionList"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"

const AuthPage: React.FC = () => {
  const { keycloak } = useKeycloak()

  const values = {
    naam: keycloak.tokenParsed?.name ?? "-",
    email: keycloak.tokenParsed?.email ?? "-",
    username: keycloak.tokenParsed?.preferred_username ?? "-",
    roles: keycloak.realmAccess?.roles.join(", ") ?? "-"
  }

  return (
    <DefaultLayout>
      <Heading>Keycloak gebruiker</Heading>
      <DefinitionList values={ values } />
    </DefaultLayout>
  )
}

export default AuthPage
