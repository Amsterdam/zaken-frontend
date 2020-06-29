import IndexPage from "./components/pages/index/IndexPage"
import EditPage from "./components/pages/edit/EditPage"
import CreatePage from "./components/pages/create/CreatePage"

// NOTE: please add your own POC-specific routes here.
export default {
  "/": IndexPage,
  "/cases": IndexPage,
  "/cases/create": CreatePage,
  "/cases/:uuid": EditPage
}
