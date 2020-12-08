import IndexPage from "./components/pages/index/IndexPage"

import CreatePage from "./components/pages/create/CreatePage"


import DetailsPage from "./components/pages/details/DetailsPage"
import EditPage from "./components/pages/edit/EditPage"

import DebriefCreatePage from "app/features/debriefings/components/pages/CreatePage"
import DebriefEditPage from "app/features/debriefings/components/pages/EditPage"

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
        icon: "FolderOutlined"
      },
      ":id/debriefing": {
        Page: DebriefCreatePage,
        title: "Debrief terugkoppeling geven",
        icon: "Edit"
      },
      ":caseId/debriefing/:id": {
        Page: DebriefEditPage,
        title: "Debrief terugkoppeling wijzigen",
        icon: "Edit"
      }
    }
  }
}
