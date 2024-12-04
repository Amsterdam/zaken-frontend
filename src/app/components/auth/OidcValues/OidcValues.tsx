import { DefinitionList } from "@amsterdam/wonen-ui"
import { useDecodedToken } from "app/state/auth/oidc/useDecodedToken" 


const OidcValues: React.FC = () => {
  const decodedToken = useDecodedToken()
  const values = decodedToken ? {
    "Voornaam": decodedToken?.given_name,
    "Achternaam": decodedToken?.family_name,
    "E-mail": decodedToken?.unique_name
  } : {}

  return <DefinitionList data={ values } />
}

export default OidcValues