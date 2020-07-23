import IndexPage from "./components/pages/index/IndexPage"

import CreatePage from "./components/pages/create/CreatePage"
import HomePage from "./components/pages/home/HomePage"

import DetailsPage from "./components/pages/details/DetailsPage"

// NOTE: please add your own POC-specific routes here.
export default {
  "/": HomePage,
  "/cases": IndexPage,
  "/cases/create": CreatePage,
  "/cases/:id": DetailsPage
}
