
import { Residents } from "@amsterdam/wonen-ui"
import { useResidents } from "app/state/rest"
import LoadingDetails from "app/components/shared/Details/LoadingDetails"
import { Heading, Paragraph } from "@amsterdam/asc-ui"
import MyAccessInfo from "./MyAccessInfo"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const ResidentsOverview: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy, mksError, myAccessError }] = useResidents(bagId)
  const dataSource = (data || []) as Components.Schemas.Residents

  if (isBusy) {
    return <LoadingDetails numRows={4} />
  }
  if (myAccessError) {
    return (
      <MyAccessInfo />
    )
  }
  if (mksError) {
    return (
      <>
        <Heading forwardedAs="h2">MKS toegang vereist</Heading>
        <Paragraph>
          Om toegang te krijgen tot de BRP-gegevens, moet je de juiste rechten aanvragen voor <strong>Makelaarsuite (MKS)</strong>. 
          <br />
          Vraag je teamleider of doe een melding bij de servicedesk.<br /><br />
        </Paragraph>
      </>
    )
  }
  return (
    <Residents data={dataSource} header />
  )
}

export default ResidentsOverview
