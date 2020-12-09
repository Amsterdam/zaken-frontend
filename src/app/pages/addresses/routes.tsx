import IndexPage from "app/pages/addresses/index/IndexPage"
import DetailsPage from "app/pages/addresses/details/DetailsPage"
import PeoplePage from "app/pages/addresses/people/PeoplePage"
import CasesPage from "app/pages/addresses/cases/CasesPage"
import PermitIndexPage from "app/features/permits/components/pages/index/IndexPage"

// NOTE: please add your own POC-specific routes here.
export default {
  "/adres/:bagId": {
    Page: IndexPage,
    title: "Adresoverzicht",
    subRoutes: {
      "detail": {
        Page: DetailsPage,
        icon: "Home",
        title: "Adresdetails"
      },
      "personen": {
        Page: PeoplePage,
        icon: "Portrait",
        title: "Persoonsgegevens"
      },
      "vergunningen": {
        Page: PermitIndexPage,
        icon: "AssignmentTurnedIn",
        title: "Vergunningen"
      },
      "zaken": {
        Page: CasesPage,
        icon: "Folder",
        title: "Gerelateerde zaken"
      }
    }
  }
}
