import IndexPage from "app/pages/addresses/index/IndexPage"
import DetailsPage from "app/pages/addresses/details/DetailsPage"
import PermitsPage from "app/pages/addresses/permits/PermitsPage"
import CreateCasePage from "app/pages/cases/create/CreateCasePage"
import PeoplePage from "app/pages/addresses/people/PeoplePage"

export default {
  "adres/:bagId": {
    Page: IndexPage,
    title: "Adresoverzicht",
    subRoutes: {
      "details": {
        Page: DetailsPage,
        icon: "Home",
        title: "Adresdetails"
      },
      "personen": {
        Page: PeoplePage,
        icon: "Portrait",
        title: "Persoonsgegevens",
        permissionNames: ["access_personal_data_register"]
      },
      "vergunningen": {
        Page: PermitsPage,
        icon: "AssignmentTurnedIn",
        title: "Vergunningen"
      },
      "zaken/nieuw": {
        Page: CreateCasePage,
        icon: "Edit",
        title: "Nieuwe zaak aanmaken",
        permissionNames: ["create_case", "create_digital_surveilance_case"]
      }
    }
  }
}
