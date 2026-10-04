import { Description } from "@/components/Description/Description"
import { formatDate } from "@/shared/dateFormatters"

type Props = {
  fine: components["schemas"]["Fine"]
}

const FinesSearchResult: React.FC<Props> = ({ fine }) => (
  <Description
    termsWidth="narrow"
    data={[
      { label: "Kenmerk", value: fine.identificatienummer },
      {
        label: "Status",
        value: fine.invorderingstatus !== undefined ? "Opgepakt" : "Onbekend",
      },
      { label: "Datum", value: formatDate(fine.dagtekening, undefined, "-") },
    ]}
  />
)

export default FinesSearchResult
