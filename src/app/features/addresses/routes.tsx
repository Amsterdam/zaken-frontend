import IndexPage from "./components/pages/index/IndexPage"
import DetailPage from "./components/pages/detail/DetailPage"

// NOTE: please add your own POC-specific routes here.
export default {
  "/adres/:bagId": {
    Page: IndexPage,
    subRoutes: {
      "detail": DetailPage,
      "personen": DetailPage,
      "vergunningen": DetailPage,
      "zaken": DetailPage
    }
  }
}
