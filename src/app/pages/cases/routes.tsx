import IndexPage from "app/pages/cases/index/IndexPage"
import DetailsPage from "app/pages/cases/details/DetailsPage"
import DebriefCreatePage from "app/pages/debriefings/CreatePage"
import DebriefEditPage from "app/pages/debriefings/EditPage"
import OpinionCreatePage from "app/pages/opinions/CreatePage"
import SummonCreatePage from "app/pages/summons/CreatePage"
import DecisionCreatePage from "app/pages/decisions/CreatePage"
import CorrespondenceCreatePage from "app/pages/correspondence/CreatePage"
import CompleteCasePage from "app/pages/cases/complete/CompleteCasePage"

// NOTE: please add your own POC-specific routes here.
export default {
  "/cases": {
    title: "Zakenoverzicht",
    Page: IndexPage,
    icon: "Folder",
    subRoutes: {
      ":id": {
        Page: DetailsPage,
        title: "Zaakdetails",
        icon: "Folder"
      },
      ":id/afronden": {
        Page: CompleteCasePage,
        title: "Zaak afronden",
        icon: "Edit"
      },
      ":id/correspondence": {
        Page: CorrespondenceCreatePage,
        title: "Correspondentie toevoegen",
        icon: "Edit"
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
      },
      ":id/decision": {
        Page: DecisionCreatePage,
        title: "Resultaat besluit",
        icon: "Edit"
      },
      ":id/opinion": {
        Page: OpinionCreatePage,
        title: "Resultaat zienswijze",
        icon: "Edit"
      },
      ":id/summon": {
        Page: SummonCreatePage,
        title: "Resultaat aanschrijving",
        icon: "Edit"
      }
    }
  }
}
