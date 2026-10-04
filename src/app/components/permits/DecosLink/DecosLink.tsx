import { StandaloneLink } from "@amsterdam/design-system-react"
import { LinkExternalIcon } from "@amsterdam/design-system-react-icons"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
}

// TODO: make hardcoded link dynamic
const DecosLink: React.FC<Props> = ({ bagId }) => (
  <StandaloneLink
    href={`https://decosdvl.amsterdam.nl/decosweb/aspx/Search.aspx?q=${bagId}`}
    icon={LinkExternalIcon}
    target="_blank"
    rel="noopener noreferrer"
  >
    Voor alle vergunningen zie Decos Join
    <span className="ams-visually-hidden">
      {" "}
      (externe website, opent in een nieuw tabblad)
    </span>
  </StandaloneLink>
)

export default DecosLink
