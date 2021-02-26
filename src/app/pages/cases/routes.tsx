import IndexPage from "app/pages/cases/index/IndexPage"
import DetailsPage from "app/pages/cases/details/DetailsPage"
import DebriefCreatePage from "app/pages/case/debriefings/CreatePage"
import DebriefEditPage from "app/pages/case/debriefings/EditPage"
import OpinionCreatePage from "app/pages/case/opinions/CreatePage"
import SummonCreatePage from "app/pages/case/summons/CreatePage"
import DecisionCreatePage from "app/pages/case/decisions/CreatePage"
import CorrespondenceCreatePage from "app/pages/case/correspondence/CreatePage"
import CompleteCasePage from "app/pages/cases/complete/CompleteCasePage"
import VisitCreatePage from "app/pages/case/visits/CreatePage"
import FormPage from "../forms/FormPage"


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
          "debriefing/:debriefingId": {
            Page: DebriefEditPage,
            title: "Debrief terugkoppeling wijzigen",
            icon: "Edit"
          },
          "besluit": {
            Page: DecisionCreatePage,
            title: "Resultaat besluit",
            icon: "Edit"
          },
          "zienswijze": {
            Page: OpinionCreatePage,
            title: "Resultaat zienswijze",
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
          "form": {
            Page: FormPage,
            title: "Form",
            icon: "Edit"
          }
        }
      }
    }
  }
}
