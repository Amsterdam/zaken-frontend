import IndexPage from "app/pages/cases/index/IndexPage"
import DetailsPage from "app/pages/cases/details/DetailsPage"
import DebriefCreatePage from "app/pages/case/debriefings/CreatePage"
import SummonCreatePage from "app/pages/case/summons/CreatePage"
import DecisionCreatePage from "app/pages/case/decisions/CreatePage"
import CorrespondenceCreatePage from "app/pages/case/correspondence/CreatePage"
import CompleteCasePage from "app/pages/cases/complete/CompleteCasePage"
import SignalCreatePage from "app/pages/case/signals/CreatePage"
import VisitCreatePage from "app/pages/case/visits/CreatePage"

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
          "correspondentie": {
            Page: CorrespondenceCreatePage,
            title: "Notitie toevoegen",
            icon: "Edit"
          },
          "debriefing": {
            Page: DebriefCreatePage,
            title: "Debrief terugkoppeling geven",
            icon: "Edit"
          },
          "besluit": {
            Page: DecisionCreatePage,
            title: "Resultaat besluit",
            icon: "Edit"
          },
          "aanschrijving": {
            Page: SummonCreatePage,
            title: "Resultaat aanschrijving",
            icon: "Edit"
          },
          "huisbezoek": {
            Page: VisitCreatePage,
            title: "Resultaat huisbezoek",
            icon: "Edit"
          },
          "melding": {
            Page: SignalCreatePage,
            title: "Melding rapporteren",
            icon: "Edit"
          }
        }
      }
    }
  }
}
