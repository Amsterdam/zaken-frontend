import { Description } from "@/components/Description/Description"
import { useDecodedToken } from "app/state/auth/oidc/useDecodedToken"

const OidcValues: React.FC = () => {
  const decodedToken = useDecodedToken()

  return (
    <Description
      termsWidth="narrow"
      data={[
        { label: "Voornaam", value: decodedToken?.given_name },
        { label: "Achternaam", value: decodedToken?.family_name },
        { label: "E-mail", value: decodedToken?.unique_name },
      ]}
    />
  )
}

export default OidcValues
