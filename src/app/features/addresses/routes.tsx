import IndexPage from "./components/pages/index/IndexPage"
import DetailsPage from "./components/pages/details/DetailsPage"
import PeoplePage from "./components/pages/people/PeoplePage"
import CasesPage from "./components/pages/cases/CasesPage"
import PermitIndexPage from "app/features/permits/components/pages/index/IndexPage"

// NOTE: please add your own POC-specific routes here.
export default {
  "/adres/:bagId": {
    Page: IndexPage,
    subRoutes: {
      "details": DetailsPage,
      "personen": PeoplePage,
      "vergunningen": PermitIndexPage,
      "zaken": CasesPage
    }
  }
}
