import IndexPage from "./components/pages/index/IndexPage"

import CreatePage from "./components/pages/create/CreatePage"


import DetailsPage from "./components/pages/details/DetailsPage"
import EditPage from "./components/pages/edit/EditPage"

import DebriefCreatePage from "./components/pages/debriefing/CreatePage"
import DebriefEditPage from "./components/pages/debriefing/EditPage"

// NOTE: please add your own POC-specific routes here.
export default {
  "/cases": {
    title: "Zakenoverzicht",
    Page: IndexPage,
    subRoutes: {
      "create": CreatePage,
      "edit/:id": EditPage,
      ":id": {
        Page: DetailsPage,
        title: "Zaakdetails",
        icon: "Suitcase"
      },
      ":id/debriefing": {
        Page: DebriefCreatePage,
        title: "Debrief terugkoppeling geven",
        icon: "DocumentEdit"
      },
      ":caseId/debriefing/:id": {
        Page: DebriefEditPage,
        title: "Debrief terugkoppeling wijzigen",
        icon: "DocumentEdit"
      }
    }
  }
}
