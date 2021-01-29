import IndexPage from "app/pages/cases/index/IndexPage"
import DetailsPage from "app/pages/cases/details/DetailsPage"
import DebriefCreatePage from "app/pages/debriefings/CreatePage"
import DebriefEditPage from "app/pages/debriefings/EditPage"
import OpinionCreatePage from "app/pages/opinions/CreatePage"
import SummonCreatePage from "app/pages/summons/CreatePage"
import DecisionCreatePage from "app/pages/decisions/CreatePage"
import CorrespondenceCreatePage from "app/pages/correspondence/CreatePage"
import CompleteCasePage from "app/pages/cases/complete/CompleteCasePage"
import VisitCreatePage from "app/pages/visits/CreatePage"


// NOTE: please add your own POC-specific routes here.
export default {
  "/zaken": {
    title: "Zakenoverzicht",
    Page: IndexPage,
    icon: "Folder",
    subRoutes: {
      ":id": {
        Page: DetailsPage,
        title: "Zaakdetails",
        icon: "Folder",
        subRoutes: {
          "afronden": {
            Page: CompleteCasePage,
            title: "Zaak afronden",
            icon: "Edit"
          },
          "correspondence": {
            Page: CorrespondenceCreatePage,
            title: "Notitie toevoegen",
            icon: "Edit"
          },
          "debriefing": {
            Page: DebriefCreatePage,
            title: "Debrief terugkoppeling geven",
            icon: "Edit"
          },
          "debriefing/:debriefingId": {
            Page: DebriefEditPage,
            title: "Debrief terugkoppeling wijzigen",
            icon: "Edit"
          },
          "decision": {
            Page: DecisionCreatePage,
            title: "Resultaat besluit",
            icon: "Edit"
          },
          "opinion": {
            Page: OpinionCreatePage,
            title: "Resultaat zienswijze",
            icon: "Edit"
          },
          "summon": {
            Page: SummonCreatePage,
            title: "Resultaat aanschrijving",
            icon: "Edit"
          },
          "visits": {
            Page: VisitCreatePage,
            title: "Resultaat huisbezoek",
            icon: "Edit"
          }
        }
      }
    }
  }
}
