
import { useParams } from "react-router-dom"
import Row from "app/components/layouts/Grid/Row"
import PageHeading from "app/components/shared/PageHeading/PageHeading"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"
import PermitDetailsList from "app/components/permits/PermitDetails/PermitDetails"
import PermitsPowerBrowser from "app/components/permits/PermitsPowerBrowser/PermitsPowerBrowser"
import HolidayRentalReports from "app/components/permits/HolidayRental/VacationRental"
import HolidayRentalRegistrations from "app/components/permits/HolidayRental/Registrations"
import DetailHeader from "app/components/shared/DetailHeader/DetailHeader"
import Column from "app/components/layouts/Grid/Column"
import NotFoundPage from "app/pages/errors/NotFoundPage"
import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import DecosLink from "app/components/permits/DecosLink/DecosLink"

type Props = {
  bagId: string
}

const PermitsPage: React.FC = () => {
  const { bagId } = useParams<Props>()
  return (
    isValidUrlParamBAGId(bagId) ? (
      <DefaultLayout>
        <Row>
          <Column spanLarge={ 50 }>
            <PageHeading />
          </Column>
          <Column spanLarge={ 50 }>
            <DetailHeader bagId={ bagId } />
          </Column>
        </Row>
        <Row>
          <Column spanLarge={ 50 }>
            <PermitDetailsList bagId={ bagId } />
            <HolidayRentalReports bagId={ bagId } />
            <DecosLink bagId={ bagId } />
          </Column>
          <Column spanLarge={ 50 }>
            <PermitsPowerBrowser bagId={ bagId } />
            <HolidayRentalRegistrations bagId={ bagId } />
          </Column>
        </Row>
      </DefaultLayout>
    ) : <NotFoundPage />
  )
}

export default  PermitsPage
