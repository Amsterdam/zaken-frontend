import IndexPage from "./components/pages/index/IndexPage"
import DetailPage from "./components/pages/detail/DetailPage"

// NOTE: please add your own POC-specific routes here.
export default {
  "/adres/:bagId": IndexPage,
  "/adres/:bagId/detail": DetailPage,
  "/adres/:bagId/personen": DetailPage,
  "/adres/:bagId/vergunningen": DetailPage,
  "/adres/:bagId/zaken": DetailPage
}
