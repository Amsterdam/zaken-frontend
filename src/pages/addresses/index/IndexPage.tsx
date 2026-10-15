import { useNavigate, useParams } from "react-router"
import { Button } from "@amsterdam/design-system-react"
import useHasPermission from "@/hooks/useHasPermission"
import isValidUrlParamBAGId from "@/router/utils/isValidUrlParamBAGId"
import Advertisements from "@/components/addresses/Advertisements/Advertisements"
import AddressPage from "@/components/addresses/AddressOverview/AddressPage"
import CasesByBagId from "@/components/addresses/CasesByBagId/CasesByBagId"
import NotFoundPage from "@/pages/errors/NotFoundPage"

type Props = {
  bagId: string
}

/** The first tab of an address: its cases. */
const IndexPage: React.FC = () => {
  const { bagId } = useParams<Props>()
  const navigate = useNavigate()
  const [canCreateCase] = useHasPermission(["create_case"])

  if (!isValidUrlParamBAGId(bagId)) return <NotFoundPage />

  return (
    <AddressPage bagId={bagId}>
      <CasesByBagId
        bagId={bagId}
        openCases={true}
        title="Open zaken"
        emptyText="Op dit adres zijn er geen open zaken"
      />
      <CasesByBagId
        title="Gesloten zaken AZA"
        bagId={bagId}
        emptyText="Op dit adres zijn geen gesloten zaken"
      />
      {/* The advertisements of the open cases. */}
      <Advertisements bagId={bagId} />
      <div>
        <Button
          disabled={!canCreateCase}
          title={
            canCreateCase ? undefined : "U heeft geen permissie tot deze actie"
          }
          onClick={() => navigate(`/adres/${bagId}/zaken/nieuw`)}
          data-testid="btn_add_case"
        >
          Nieuwe zaak aanmaken
        </Button>
      </div>
    </AddressPage>
  )
}

export default IndexPage
