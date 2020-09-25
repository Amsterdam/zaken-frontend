import IndexPage from "./components/pages/index/IndexPage"
import DetailPage from "./components/pages/detail/DetailPage"
import PermitIndexPage from "app/features/permits/components/pages/index/IndexPage"

// NOTE: please add your own POC-specific routes here.
export default {
  "/adres/:bagId": {
    Page: IndexPage,
    title: "Adres overzicht",
    subRoutes: {
      "detail": {
        Page: DetailPage,
        icon: "Housing",
        title: "Adres details"
      },
      "personen": {
        Page: DetailPage,
        icon: "PersonalLogin",
        title: "Persoonsgegevens"
      },
      "vergunningen": {
        Page: PermitIndexPage,
        icon: "DocumentCheckmark",
        title: "Vergunningen"
      },
      "zaken": {
        Page: DetailPage,
        icon: "Layers",
        title: "Gerelateerde zaken"
      }
    }
  }
}
