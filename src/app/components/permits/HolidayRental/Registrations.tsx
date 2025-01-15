import { Heading } from "@amsterdam/asc-ui"
import { HolidayRentalRegistration, HolidayRentalRegistrations } from "@amsterdam/wonen-ui"
import { useRegistrations } from "app/state/rest"

type Props = {
  bagId: string
}

const Registrations: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = useRegistrations(bagId)

  return (
    <>
      <Heading forwardedAs="h4">Toeristischeverhuur registraties</Heading>
      <HolidayRentalRegistrations
        data={ (data || []) as HolidayRentalRegistration[]}
        loading={ isBusy }
        defaultOpen={ true }
      />
    </>
  )
}

export default Registrations
