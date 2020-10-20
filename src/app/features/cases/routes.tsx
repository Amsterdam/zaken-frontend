import IndexPage from "./components/pages/index/IndexPage"

import CreatePage from "./components/pages/create/CreatePage"


import DetailsPage from "./components/pages/details/DetailsPage"
import EditPage from "./components/pages/edit/EditPage"

// NOTE: please add your own POC-specific routes here.
export default {
  "/cases": {
    title: "Zakenoverzicht",
    Page: IndexPage
  },
  "/cases/create": CreatePage,
  "/cases/edit/:id": EditPage,
  "/cases/:id": {
    Page: DetailsPage,
    title: "Zaakdetails",
    icon: "Suitcase"
  }
}
