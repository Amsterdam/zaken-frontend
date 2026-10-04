import { useLocation } from "react-router-dom"
import { TabNavigation } from "@amsterdam/design-system-react"
import { usePermitDetails } from "@/api/hooks"
import useHasPermission from "@/hooks/useHasPermission"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
}

const withoutTrailingSlash = (path: string) => path.replace(/\/+$/, "")

/** The pages of an address as tabs; the cases are the first one. */
const AddressTabs: React.FC<Props> = ({ bagId }) => {
  const { pathname } = useLocation()
  const [hasPersonalDataPermission] = useHasPermission([
    "access_personal_data_register",
  ])
  const { data: permitDetails } = usePermitDetails(bagId)

  // "2" when all the permits that were found are granted, else "2/3".
  const permits = permitDetails?.permits ?? []
  const granted = permits.filter((p) => p.permit_granted === "GRANTED").length
  const found = permits.filter((p) =>
    ["GRANTED", "NOT_GRANTED"].includes(p.permit_granted),
  ).length
  const permitCount = found === granted ? granted : `${granted}/${found}`

  const base = `/adres/${bagId}`
  const tabs = [
    { href: base, label: "Zaken" },
    { href: `${base}/details`, label: "Adresdetails" },
    ...(hasPersonalDataPermission
      ? [{ href: `${base}/personen`, label: "Persoonsgegevens" }]
      : []),
    {
      href: `${base}/vergunningen`,
      label: `Vergunningen${permitCount ? ` (${permitCount})` : ""}`,
    },
  ]

  return (
    <TabNavigation accessibleName="Pagina's van dit adres">
      <TabNavigation.List>
        {tabs.map(({ href, label }) => (
          <TabNavigation.Link
            key={href}
            linkComponent={RouterLink}
            href={href}
            aria-current={
              withoutTrailingSlash(pathname) === href ? "page" : undefined
            }
          >
            {label}
          </TabNavigation.Link>
        ))}
      </TabNavigation.List>
    </TabNavigation>
  )
}

export default AddressTabs
