import IndexPage from "./components/pages/index/IndexPage"
import EditPage from "./components/pages/edit/EditPage"
import CreatePage from "./components/pages/create/CreatePage"
import HomePage from "./components/pages/home/HomePage"

// NOTE: please add your own POC-specific routes here.
export default {
  "/": HomePage,
  "/cases": IndexPage,
  "/cases/create": CreatePage,
  "/cases/:id": EditPage
}
