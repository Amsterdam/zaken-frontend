import IndexPage from "app/pages/cases/index/IndexPage"
import CreatePage from "app/pages/cases/create/CreatePage"
import DetailsPage from "app/pages/cases/details/DetailsPage"
import EditPage from "app/pages/cases/edit/EditPage"
import DebriefCreatePage from "app/pages/debriefings/CreatePage"
import DebriefEditPage from "app/pages/debriefings/EditPage"

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
        icon: "Folder"
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
