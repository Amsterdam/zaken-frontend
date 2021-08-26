import IndexPage from "app/pages/addresses/index/IndexPage"
import DetailsPage from "app/pages/addresses/details/DetailsPage"
import PeoplePage from "app/pages/addresses/people/PeoplePage"
import PermitsPage from "app/pages/addresses/permits/PermitsPage"
import CasesPage from "app/pages/addresses/cases/CasesPage"
import CreateCasePage from "app/pages/cases/create/CreateCasePage"

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
        permissionName: "access_personal_data_register"
      },
      "vergunningen": {
        Page: PermitsPage,
        icon: "AssignmentTurnedIn",
        title: "Vergunningen"
      },
      "zaken": {
        Page: CasesPage,
        icon: "Folder",
        title: "Zaken op dit adres",
        subRoutes: {
          "nieuw": {
            Page: CreateCasePage,
            icon: "Edit",
            title: "Nieuwe zaak aanmaken",
            permissionName: "create_case"
          }
        }
      }

    }
  }
}
