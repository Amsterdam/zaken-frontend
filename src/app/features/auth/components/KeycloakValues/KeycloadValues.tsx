import React from "react"

import type KeycloakTokenParsedExtended from "app/state/auth/keycloak/KeycloakTokenParsedExtended"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import DefinitionList from "app/features/shared/components/molecules/DefinitionList/DefinitionList"

const KeycloakValues: React.FC = () => {
  const keycloak = useKeycloak()
  const tokenParsed = keycloak.tokenParsed as KeycloakTokenParsedExtended

  const values = {
    Naam: tokenParsed?.name ?? "-",
    "E-mail": tokenParsed?.email ?? "-",
    Gebruikersnaam: tokenParsed?.preferred_username ?? "-",
    "Keycloak groepen": keycloak.realmAccess?.roles.join(", ") ?? "-"
  }

  return <DefinitionList values={ values } />
}

export default KeycloakValues